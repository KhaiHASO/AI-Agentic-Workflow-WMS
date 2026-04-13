# Evidence Gap Report

This report identifies the discrepancies between the required evidence and the actual evidence captured during the QA sign-off process.

## 1. Flows with Real Screenshots Captured
The following core screens have been successfully captured as PNG files from the live running application:
- **Inbound Draft (Initial state):** `docs/qa-signoff/screenshots/WMS-INB-001/01-initial.png`
- **Inventory Management:** `docs/qa-signoff/screenshots/WMS-INV-001/01-initial.png`
- **Cycle Count (Manager view):** `docs/qa-signoff/screenshots/WMS-INV-002/01-initial.png`
- **Putaway Tasks:** `docs/qa-signoff/screenshots/WMS-OUT-002/01-initial.png`
- **Master Data (Items/Calculator):** `docs/qa-signoff/screenshots/WMS-MAS-001/01-initial.png`
- **Sales Orders:** `docs/qa-signoff/screenshots/WMS-OUT-001/01-initial.png`

## 2. Flows Lacking Interactive Screenshots
The following interactive flows could not be captured as PNG files due to technical environment constraints:
- **WMS-INB-002 (Over-receipt PIN Modal):** Requires programmatic input triggers.
- **WMS-INB-003 (Damage Split Modal):** Requires button click and form interaction.
- **WMS-OUT-002 (Alternative Location Modal):** Requires interaction with the suggestion engine buttons.

## 3. Technical Reasons for Missing Evidence
The evidence generation was performed using `google-chrome --headless` via CLI. This tool captures the initial load state of a URL but cannot easily perform the following sequences without a complex automation script (like Puppeteer/Playwright):
1. Clicking specific rows in a dynamic table.
2. Typing into hidden or modal input fields.
3. Waiting for specific `toast` animations or logic-driven UI transitions.

## 4. Remaining Credibility Gaps
- **Automated Verification:** No Jest/Cypress tests exist to verify the *interactive* state logic (e.g., "does the PIN actually unlock the field?"). Proof currently relies on source code review of `InboundDraftLayer.jsx`.
- **Environment Parity:** Screenshots are taken from a development build (`npm start`). Production build behavior (`npm run build`) may vary if environment variables are misconfigured.
- **Security:** The PIN mechanism is currently client-side only for demo purposes.

## 5. Mitigation
To close these gaps, a manual UOM (User Acceptance Testing) session is recommended where a human operator executes the scripts defined in `flow-evidence.md` on a live browser.
