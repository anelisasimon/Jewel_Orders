# JewelOrders
A complete order management web system for a custom jewelry boutique, tracking bespoke pieces, materials, manufacturing status, and customer deliveries.

## Data model
| Field | Type | Notes |
| :--- | :--- | :--- |
| item | text | required, max 100 chars (ex: piece name and design details) |
| delivered | boolean | toggled from the list, default false (Livrată / În atelier) |
| material | fixed values | Aur Galben 18K, Aur Alb 14K, Argint 925, Platina |
| category | relation | Inele & Verighete, Coliere & Pandantive, Bratari, Cercei |
| user | relation | the jeweler / store manager (from week 11) |

Sample data used across all stages:
1. Inel Solitar cu Diamant Solitaire, active, Aur Galben 18K
2. Bratara Tennis cu Pietre Pretioase, done, Aur Alb 14K
3. Colier cu Pandantiv Inima Gravat, active, Argint 925

## How to run
Open index.html in a browser. No build step, no server.

## AI usage
| Tool | Used for |
| :--- | :--- |
| Gemini | Defining project theme data model, generating initial HTML/CSS template and documentation |

Details per stage: see the ai-log/ folder.

## Status
- [ ] Stage 1: static mockup
- [ ] Stage 2: data logic in JavaScript