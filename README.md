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
| Gemini | Defining project theme data model, generating HTML/CSS template, JavaScript data logic, and documentation |

Details per stage: see the ai-log/ folder.

## Stage 2: data logic
Plain JavaScript, no DOM. taskuri.js holds the array and the functions that read and change it. Results are printed in the browser console (F12).

## Status
- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [ ] Stage 3: Vite and React project

## Verification checklist

### Stage 1 verification checklist
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

### Stage 2 verification checklist
| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S2-R1 | JS file linked, logs on page load | [index.html#L64](https://github.com/anelisasimon/Jewel_Orders/blob/main/index.html#L64) | open page, F12 |
| S2-R2 | 3+ items with id, name, state, tag | [taskuri.js#L2-L6](https://github.com/anelisasimon/Jewel_Orders/blob/main/taskuri.js#L2-L6) | read |
| S2-R3 | list, count, search, add, toggle, delete | [taskuri.js#L11-L64](https://github.com/anelisasimon/Jewel_Orders/blob/main/taskuri.js#L11-L64) | console output |
| S2-R4 | add rejects empty name and invalid tag | [taskuri.js#L30-L38](https://github.com/anelisasimon/Jewel_Orders/blob/main/taskuri.js#L30-L38) | last 2 console lines |
| S2-R5 | original array unchanged after add | [taskuri.js#L75](https://github.com/anelisasimon/Jewel_Orders/blob/main/taskuri.js#L75) | console line |
| S2-R6 | README Stage 2 section + AI log | README.md, [ai-log/etapa-02.md](https://github.com/anelisasimon/Jewel_Orders/blob/main/ai-log/etapa-02.md) | read |
| S2-R7 | commit "Stage 2" pushed | [Commit Stage 2](https://github.com/anelisasimon/Jewel_Orders/commits/main) | commit history |