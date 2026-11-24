// Catalogul de produse prestabilite. Un client alege din el sau cere o piesă personalizată.
// Câmpul "foto" este opțional: dacă pui o poză reală în public/img/produse/
// (de exemplu foto: "/img/produse/inel-solitar.jpg"), ea înlocuiește ilustrația desenată.
// "piatra" este doar pentru ilustrație: diamant, safir, rubin, smarald sau perla.
export const CATALOG = [
  { id: "inel-solitar", nume: "Inel Solitar cu Diamant", tip: "inel", metal: "aur-galben", piatra: "diamant", pret: 4500, descriere: "Clasicul inel de logodnă, cu diamant central." },
  { id: "inel-safir", nume: "Inel cu Safir", tip: "inel", metal: "aur-alb", piatra: "safir", pret: 3800, descriere: "Safir albastru într-o montură înaltă." },
  { id: "bratara-tennis", nume: "Brățară Tennis", tip: "bratara", metal: "aur-alb", piatra: "diamant", pret: 3200, descriere: "Rând continuu de pietre, flexibilă." },
  { id: "bratara-argint", nume: "Brățară din Argint", tip: "bratara", metal: "argint", piatra: "diamant", pret: 420, descriere: "Brățară fină, cu zirconii." },
  { id: "colier-inima", nume: "Colier cu Pandantiv Inimă", tip: "colier", metal: "argint", piatra: "rubin", pret: 680, descriere: "Pandantiv în formă de inimă, gravabil." },
  { id: "colier-perla", nume: "Colier cu Perlă", tip: "colier", metal: "aur-galben", piatra: "perla", pret: 1850, descriere: "Perlă de cultură pe lanț fin." },
  { id: "cercei-smarald", nume: "Cercei cu Smarald", tip: "cercei", metal: "aur-galben", piatra: "smarald", pret: 2900, descriere: "Cercei picătură cu smaralde." },
  { id: "cercei-platina", nume: "Cercei Picătură din Platină", tip: "cercei", metal: "platina", piatra: "diamant", pret: 5200, descriere: "Cercei eleganți, cu diamante." },
];

export const gasesteProdus = (id) => CATALOG.find((p) => p.id === id) || null;
