# Stage 3: AI log
## Tools
- Gemini

## Conversations
- Gemini Web Chat (scaffolding Vite React app, folder migration, JSX syntax conversion, clean CSS reuse)

## Key requests
### 1. Vite Scaffolding and Cleanup
- Asked: Initialize React with Vite in frontend/ and remove boilerplate assets and index.css.
- Got: Clean workspace commands, removing demo files and linking App.css inside main.jsx.
- Changed or rejected: Kept jewel boutique custom theme intact.

### 2. App Component Implementation
- Asked: Adapt App.jsx for JewelOrders displaying raw JSON and calculated header metrics.
- Got: Pure JSX component rendering taskuri array, dynamic length and active count computed from data.
- Changed or rejected: Used custom jewelry order items consistent with Stages 1 and 2.

## What I learned / what did not work
Learned how Vite serves React applications using Hot Module Replacement (HMR), the essential differences between HTML and JSX (className, self-closing tags, expression braces), and ensuring node_modules and dist are excluded from version control.