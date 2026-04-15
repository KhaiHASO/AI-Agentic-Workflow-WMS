const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BUSINESS_ROUTES_KEYWORDS = [
  'inbound', 'master-data', 'sync-logs', 'putaway', 'sales-orders', 
  'pick-task', 'shipment', 'inventory', 'ledger', 'cycle-count', 
  'pallet-hu', 'quality-control', 'relocation', 'warehouse-layout', 
  'returns', 'reports', 'devices', 'invoice', 'company', 'currencies',
  'user', 'role'
];

const IGNORE_KEYWORDS = [
  'index-', 'typography', 'button', 'chat-', 'colors', 'alert', 'avatar', 
  'badges', 'card', 'carousel', 'code-generator', 'dropdown', 'email', 
  'faq', 'forgot-password', 'form', 'gallery', 'blog', 'testimonials', 
  'coming-soon', 'access-denied', 'maintenance', 'blank-page', 
  'image-generator', 'image-upload', 'kanban', 'language', 'line-chart', 
  'list', 'notification', 'pagination', 'payment-gateway', 'pie-chart', 
  'portfolio', 'pricing', 'progress', 'radio', 'sign-in', 'sign-up', 
  'star-rating', 'starred', 'switch', 'table-basic', 'table-data', 
  'tabs', 'tags', 'terms-condition', 'text-generator', 'theme', 
  'tooltip', 'video-generator', 'videos', 'voice-generator', 'widgets', 'wizard'
];

async function deepCrawl() {
  const appJsPath = path.join(__dirname, 'src', 'App.js');
  const appJsContent = fs.readFileSync(appJsPath, 'utf-8');

  // Extract routes
  const routeRegex = /path=['"]([^'"]+)['"]/g;
  const allRoutes = [];
  let match;
  while ((match = routeRegex.exec(appJsContent)) !== null) {
    if (match[1] !== '*') allRoutes.push(match[1]);
  }

  // Filter for Business Routes
  const businessRoutes = [...new Set(allRoutes)].filter(route => {
    const r = route.toLowerCase();
    const isGeneric = IGNORE_KEYWORDS.some(k => r.includes(k));
    const isBusiness = BUSINESS_ROUTES_KEYWORDS.some(k => r.includes(k));
    return isBusiness && !isGeneric;
  });

  console.log(`Targeting ${businessRoutes.length} business routes.`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  const baseUrl = 'http://localhost:3000';

  let markdown = '# WMS Structural UI Context Report\n\n';

  for (const route of businessRoutes) {
    const url = `${baseUrl}${route}`;
    console.log(`Deep Crawling: ${url}...`);
    
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      // Extra wait for any async data rendering
      await page.waitForTimeout(1000);

      const data = await page.evaluate(() => {
        // 1. Forms & Inputs
        const inputs = Array.from(document.querySelectorAll('input, select, textarea')).map(el => {
          const label = document.querySelector(`label[for="${el.id}"]`)?.innerText 
                        || el.closest('label')?.innerText 
                        || el.placeholder 
                        || el.getAttribute('aria-label') 
                        || 'N/A';
          return {
            type: el.tagName === 'SELECT' ? 'dropdown' : (el.type || el.tagName.toLowerCase()),
            identifier: el.name || el.id || el.getAttribute('data-testid') || 'N/A',
            label: label.trim().replace(/\n/g, ' '),
            value: el.value || (el.tagName === 'SELECT' ? el.options[el.selectedIndex]?.text : '') || 'Empty'
          };
        });

        // 2. Data Tables
        const tables = Array.from(document.querySelectorAll('table')).map(table => {
          const headers = Array.from(table.querySelectorAll('th')).map(th => th.innerText.trim());
          const rows = Array.from(table.querySelectorAll('tbody tr')).slice(0, 2).map(tr => 
            Array.from(tr.querySelectorAll('td')).map(td => td.innerText.trim())
          );
          return { headers, rows };
        });

        // 3. Action Buttons
        const actions = Array.from(document.querySelectorAll('button, a.btn, .button')).map(btn => {
          let intent = 'Secondary';
          const cls = btn.className.toLowerCase();
          if (cls.includes('primary') || cls.includes('success')) intent = 'Primary';
          if (cls.includes('danger') || cls.includes('warning')) intent = 'Danger/Warning';
          
          return {
            text: btn.innerText.trim().replace(/\n/g, ' '),
            identifier: btn.id || btn.className.split(' ').join('.') || btn.getAttribute('href') || 'N/A',
            intent
          };
        }).filter(a => a.text.length > 0);

        // 4. Purpose (Simple heuristic)
        const title = document.querySelector('h1, h2, h3, .breadcrumb-item.active')?.innerText || document.title;

        return { title: title.trim(), inputs, tables, actions };
      });

      markdown += `## Route: \`${route}\` (${data.title})\n`;
      
      // Form Inputs
      markdown += `- **Form Inputs:**\n`;
      if (data.inputs.length > 0) {
        data.inputs.forEach(inp => {
          markdown += `  - \`[Input: ${inp.type}]\` Label/Placeholder: "${inp.label}" | id/name: \`${inp.identifier}\` | Value: \`${inp.value}\`\n`;
        });
      } else {
        markdown += `  - No inputs found.\n`;
      }

      // Data Tables
      if (data.tables.length > 0) {
        data.tables.forEach((table, idx) => {
          markdown += `- **Data Table ${idx + 1}:**\n`;
          markdown += `  - Columns: [${table.headers.join(', ')}]\n`;
          markdown += `  - Mock Sample:\n`;
          table.rows.forEach((row, rIdx) => {
            markdown += `    - Row ${rIdx + 1}: [${row.join(', ')}]\n`;
          });
        });
      }

      // Main Actions
      markdown += `- **Main Actions:**\n`;
      if (data.actions.length > 0) {
        // Filter unique and limit to top 15 actions to keep report concise
        const uniqueActions = [];
        const seen = new Set();
        for (const a of data.actions) {
          if (!seen.has(a.text) && uniqueActions.length < 15) {
            uniqueActions.push(a);
            seen.add(a.text);
          }
        }
        uniqueActions.forEach(act => {
          markdown += `  - \`[Button: ${act.intent}]\` Text: "${act.text}" | id: \`${act.identifier}\`\n`;
        });
      }

      markdown += '\n---\n\n';

    } catch (error) {
      console.error(`Error crawling ${route}: ${error.message}`);
    }
  }

  fs.writeFileSync('contextUI.md', markdown);
  console.log('Deep crawl finished. Report saved to contextUI.md');
  await browser.close();
}

deepCrawl().catch(console.error);
