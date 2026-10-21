# Stage 4: AI log
## Tools
- Gemini

## Conversations
- [Gemini Web Chat](https://share.gemini.google/jysQ9TuX1KNM) (implementing JewelCard and JewelList components, props passing, map with key attribute, conditional rendering for empty list, custom jewelry boutique styling)
- [Claude](https://claude.ai/share/3c36151c-142e-42fd-9c28-7c271a362223) (refining boutique UI styling, warm luxury palette, gold accents and card layout)

## Key requests
### 1. Component Modularization
- Asked: Split raw JSON view into dedicated single item and list components in src/components/.
- Got: JewelCard.jsx and JewelList.jsx with proper prop destructuring and clean styling reuse.
- Changed or rejected: Kept custom jewelry attributes and Romanian state labels ("Livrată" / "În atelier").

### 2. Edge Case Handling and Quality Checks
- Asked: Support empty state conditionally and ensure unique stable key props.
- Got: Early return for empty array and verified console is warning-free.
- Changed or rejected: Used unique item.id for key instead of index.

## What I learned / what did not work
Learned how React components receive data through props, why props are strictly read-only, how to render dynamic lists using map with stable key props, and how to implement conditional rendering for empty collections without console warnings.