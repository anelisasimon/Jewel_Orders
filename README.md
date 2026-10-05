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

## Verification checklist

| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S1-R1 | README: description, fields, sample data, how to run | README.md | read |
| S1-R2 | AI usage section | README.md | read |
| S1-R3 | AI log for stage 1 | ai-log/etapa-01.md | read |
| S1-R4 | header, form (text + select), 3 cards with own data | [index.html#L12-L65](https://github.com/anelisasimon/Jewel_Orders/blob/main/index.html#L12-L65) | open the page |
| S1-R5 | finished card looks different | [style.css#L154-L157](https://github.com/anelisasimon/Jewel_Orders/blob/main/style.css#L154-L157) | look at the card |
| S1-R6 | 2 columns on desktop, 1 under 700px | [style.css#L173-L177](https://github.com/anelisasimon/Jewel_Orders/blob/main/style.css#L173-L177) | resize < 700px |
| S1-R7 | visible focus, readable dark theme | [style.css#L168-L191](https://github.com/anelisasimon/Jewel_Orders/blob/main/style.css#L168-L191) | Tab; dark mode |
| S1-R8 | commit "Stage 1" pushed | [Commit Stage 1](https://github.com/anelisasimon/Jewel_Orders/commits/main) | commit history |