# Stage 6: AI log
## Tools
- Gemini
- Claude

## Conversations
- [Gemini Web Chat](https://share.gemini.google/pbXoAaPWuzAk) (configuring json-server on port 3001, setting up package.json api script, resolving save conflicts, configuring src/api.js, and implementing useEffect with ignore cleanup)
-[Claude](https://claude.ai/share/3c36151c-142e-42fd-9c28-7c271a362223)

## Key requests
### 1. Mock REST API Configuration
- Asked: Configure json-server to serve jewelry orders on port 3001 and resolve terminal and script execution errors.
- Got: Added "api": "json-server --watch db.json --port 3001" to package.json, resolved dirty buffer conflict, and validated route /comenzi.
- Changed or rejected: Kept custom resource name "comenzi" and detailed jewelry properties in db.json.

### 2. Loading and Error State Handling
- Asked: Fetch orders in App component using useEffect and display proper loading and error messages.
- Got: Isolated fetch calls in src/api.js, handled loading and error states, and used ignore flag for cleanup.
- Changed or rejected: Retained boutique luxury layout and derived metrics.

## What I learned / what did not work
Learned how json-server mocks a REST API, how to manage dual-process development (Vite frontend + API backend), how to use useEffect with cleanup to avoid race conditions during React double-mounting, and how to read API base URLs from environment variables.