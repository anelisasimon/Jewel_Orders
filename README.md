# JewelOrders
A web management system for a boutique jewelry shop to track custom orders, materials, and delivery status.

## Data model
| Field | Type | Notes |
| :--- | :--- | :--- |
| item | text | required, max 100 chars |
| delivered | boolean | toggled from the list, default false |
| material | fixed values | Aur 14K, Argint 925, Platina |
| category | relation | Inele de logodna, Bratari gravate, Coliere cadou |
| user | relation | the store manager / owner (from week 11) |

Sample data used across all stages:
1. Inel Solitar cu Diamant, active, Aur 14K
2. Bratara Tennis cu Zirconiu, done, Argint 925
3. Verighete Personalizate, active, Platina

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