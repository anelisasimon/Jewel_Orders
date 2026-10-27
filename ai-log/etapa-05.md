# Stage 5: AI log
## Tools
- Gemini
- Claude

## Conversations
- [Claude](https://claude.ai/share/3c36151c-142e-42fd-9c28-7c271a362223) (implementing dark/light theme toggle, advanced local state management with localStorage, order status tracking, interactive UI controls, and luxury styling)
- [Gemini Web Chat](https://share.gemini.google/TnZDVeUiYoG4) (verifying Stage 5 lab requirements, immutable state update compliance, checklist validation, and repository documentation)

## Key requests
### 1. State Management and Interactive Handlers
- Asked: Make the jewelry order list interactive with local state, supporting state transitions and item removal.
- Got: Stateful list in App component, handler functions for status advance/toggle and deletion, and derived counters in header.
- Changed or rejected: Kept custom jewelry attributes, client details, and boutique theme variables.

### 2. Theme Switching and Accessibility
- Asked: Implement theme switching between light and dark mode with persistent user choice.
- Got: Header button toggling data-theme attribute on root html element and updating state, styled with warm luxury palette.
- Changed or rejected: Ensured interactive buttons have proper accessible labels.

## What I learned / what did not work
Learned how React useState manages component state, how to perform immutable state updates, how to compute derived values during render without keeping duplicate state, and how to link CSS theme variables with root attributes.