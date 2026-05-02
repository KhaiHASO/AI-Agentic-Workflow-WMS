You are preparing the WMS frontend for client handover.

Read:
- docs/source/*
- docs/agent/*
- package.json
- current source code

Create or update all handover materials.

Required deliverables:

1. README.md
Must include:
- Project overview
- Business scope
- Tech stack
- Folder structure
- Prerequisites
- Setup on Windows
- Setup on Linux/macOS
- Run development server
- Build production
- Preview production build
- Docker deployment
- Environment variables
- Mock data guide
- Mobile testing guide
- Browser support
- Troubleshooting
- Known limitations

2. docs/CLIENT_HANDOVER.md
Must include:
- What is delivered
- What is not included
- How to run
- How to test
- Demo script
- User roles
- Main screens
- Mobile/scanner workflow
- UAT checklist reference
- Maintenance notes

3. docs/UAT_EXECUTION_GUIDE.md
Must include:
- How client QA should run UAT
- How to record Actual Result
- How to capture Evidence
- How to log Defect ID
- Suggested UAT order:
  ERP sync → inbound → Draft → exception → submit → putaway → outbound → pick → inventory → dashboard → integration audit

4. docs/TECHNICAL_NOTES.md
Must include:
- Architecture
- Component structure
- Mock API design
- State management approach
- Styling approach
- Responsive strategy
- Future backend integration notes

5. scripts/setup.ps1
Windows PowerShell setup:
- check Node version
- install dependencies
- copy .env.example to .env if missing
- run build
- print run commands

6. scripts/setup.sh
Linux/macOS setup:
- check Node version
- install dependencies
- copy .env.example to .env if missing
- run build
- print run commands

7. scripts/audit.ps1 and scripts/audit.sh
Must run:
- npm install if needed
- npm run build
- npm run lint if available
- print audit result

8. Final verification
Run npm run build.
Fix any error.
Update docs/agent/06_ITERATION_LOG.md with final handover status.

Do not remove existing source code.
Do not simplify business features.
Do not hide known limitations.