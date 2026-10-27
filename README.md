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
```bash
cd frontend
npm install
npm run dev
```
Then open the address printed in the terminal (http://localhost:5173).


## AI usage
| Tool | Used for |
| :--- | :--- |
| Gemini | Defining project theme data model, generating HTML/CSS template, JavaScript data logic, and documentation |

Details per stage: see the ai-log/ folder.

## Stage 2: data logic
Plain JavaScript, no DOM. taskuri.js holds the array and the functions that read and change it. Results are printed in the browser console (F12).
## Stage 3: Vite and React project
The app now lives in frontend/, built with Vite. The data from stage 2 moved into the main component; the list is still printed raw.
## Stage 4: components
The list is rendered from the data, through two components:
JewelList receives the whole array and renders one card per item
JewelCard receives a single item through props and displays it
## Stage 5: local state and events
The list lives in React state. Checking and deleting work from the page,
and the counters in the header follow automatically. A button in the
header switches between light and dark mode. Changes are lost on refresh,
which is what stage 6 and stage 10 fix.

## Status
- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: Vite and React project
- [x] Stage 4: components rendered from data
- [x] Stage 5: local state and events
- [ ] Stage 6: loading data from a mock API

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

### Stage 3 verification checklist
| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S3-R1 | npm run dev starts without errors | [frontend/package.json](https://github.com/anelisasimon/Jewel_Orders/blob/main/frontend/package.json) | npm install, npm run dev |
| S3-R2 | app name and counter computed from data | [frontend/src/App.jsx](https://github.com/anelisasimon/Jewel_Orders/blob/main/frontend/src/App.jsx) | edit data, save |
| S3-R3 | data from README, not from the example | [frontend/src/App.jsx](https://github.com/anelisasimon/Jewel_Orders/blob/main/frontend/src/App.jsx) | compare with README |
| S3-R4 | stage 1 styles reused | [frontend/src/App.css](https://github.com/anelisasimon/Jewel_Orders/blob/main/frontend/src/App.css) | look at the page |
| S3-R5 | node_modules ignored, build passes | [frontend/.gitignore](https://github.com/anelisasimon/Jewel_Orders/blob/main/frontend/.gitignore) | npm run build |
| S3-R6 | README Stage 3 section + AI log | README.md, [ai-log/etapa-03.md](https://github.com/anelisasimon/Jewel_Orders/blob/main/ai-log/etapa-03.md) | read |
| S3-R7 | commit "Stage 3" pushed | [Commit Stage 3](https://github.com/anelisasimon/Jewel_Orders/commits/main) | commit history |

### Stage 4 verification checklist
| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S4-R1 | 2+ components in src/components/ | [frontend/src/components/](https://github.com/anelisasimon/Jewel_Orders/blob/main/frontend/src/components/) | open folder |
| S4-R2 | card receives data through props | [frontend/src/components/JewelCard.jsx](https://github.com/anelisasimon/Jewel_Orders/blob/main/frontend/src/components/JewelCard.jsx) | read |
| S4-R3 | map + key={id}, no console warnings | [frontend/src/components/JewelList.jsx](https://github.com/anelisasimon/Jewel_Orders/blob/main/frontend/src/components/JewelList.jsx) | F12, Console |
| S4-R4 | message for empty list | [frontend/src/components/JewelList.jsx](https://github.com/anelisasimon/Jewel_Orders/blob/main/frontend/src/components/JewelList.jsx) | set array to [] |
| S4-R5 | state changes the card look | [frontend/src/components/JewelCard.jsx](https://github.com/anelisasimon/Jewel_Orders/blob/main/frontend/src/components/JewelCard.jsx) | toggle a done flag |
| S4-R6 | README Stage 4 section + AI log | README.md, [ai-log/etapa-04.md](https://github.com/anelisasimon/Jewel_Orders/blob/main/ai-log/etapa-04.md) | read |
| S4-R7 | commit "Stage 4" pushed | [Commit Stage 4](https://github.com/anelisasimon/Jewel_Orders/commits/main) | commit history |

### Stage 5 verification checklist
| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S5-R1 | list kept in useState, in App | [frontend/src/App.jsx](https://github.com/anelisasimon/Jewel_Orders/blob/main/frontend/src/App.jsx) | read |
| S5-R2 | toggling changes state and card look | [frontend/src/App.jsx](https://github.com/anelisasimon/Jewel_Orders/blob/main/frontend/src/App.jsx), [frontend/src/components/JewelCard.jsx](https://github.com/anelisasimon/Jewel_Orders/blob/main/frontend/src/components/JewelCard.jsx) | click a checkbox / status button |
| S5-R3 | delete removes the item | [frontend/src/App.jsx](https://github.com/anelisasimon/Jewel_Orders/blob/main/frontend/src/App.jsx), [frontend/src/components/JewelCard.jsx](https://github.com/anelisasimon/Jewel_Orders/blob/main/frontend/src/components/JewelCard.jsx) | click Delete |
| S5-R4 | header counter derived, not in state | [frontend/src/App.jsx](https://github.com/anelisasimon/Jewel_Orders/blob/main/frontend/src/App.jsx) | toggle, watch header |
| S5-R5 | immutable updates (no push, splice, assignment) | [frontend/src/App.jsx](https://github.com/anelisasimon/Jewel_Orders/blob/main/frontend/src/App.jsx) | read |
| S5-R6 | light/dark toggle: state + data-theme on html | [frontend/src/App.jsx](https://github.com/anelisasimon/Jewel_Orders/blob/main/frontend/src/App.jsx), [frontend/src/App.css](https://github.com/anelisasimon/Jewel_Orders/blob/main/frontend/src/App.css) | click the button, both system themes |
| S5-R7 | no console warnings; README + AI log | README.md, [ai-log/etapa-05.md](https://github.com/anelisasimon/Jewel_Orders/blob/main/ai-log/etapa-05.md) | F12, Console |
| S5-R8 | commit "Stage 5" pushed | [Commit Stage 5](https://github.com/anelisasimon/Jewel_Orders/commits/main) | commit history |

