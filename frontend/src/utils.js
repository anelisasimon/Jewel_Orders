export const ETAPE = ["Proiectare", "Turnare", "Montare pietre", "Finisare", "Livrată"];

export const ETICHETE_MATERIAL = {
  "aur-galben": "Aur Galben 18K",
  "aur-alb": "Aur Alb 14K",
  "argint": "Argint 925",
  "platina": "Platină",
};

// Preț în lei, în funcție de tipul piesei și de metal (modifică-l liber)
export const PRETURI = {
  inel:    { "aur-galben": 4500, "aur-alb": 3900, "argint": 900, "platina": 7200 },
  bratara: { "aur-galben": 3900, "aur-alb": 3200, "argint": 750, "platina": 6800 },
  colier:  { "aur-galben": 3600, "aur-alb": 3100, "argint": 680, "platina": 6200 },
  cercei:  { "aur-galben": 2800, "aur-alb": 2500, "argint": 420, "platina": 4900 },
};

export const pretPentru = (tip, material) => (PRETURI[tip] && PRETURI[tip][material]) || 0;

export const lei = (n) => `${Number(n).toLocaleString("ro-RO")} lei`;

export const formateazaData = (iso) => (iso ? iso.split("-").reverse().join(".") : "");

// Avertisment pentru termene apropiate sau depășite
export function infoTermen(iso) {
  if (!iso) return null;
  const azi = new Date();
  azi.setHours(0, 0, 0, 0);
  const [a, l, z] = iso.split("-").map(Number);
  const zile = Math.round((new Date(a, l - 1, z) - azi) / 86400000);
  if (zile < 0) return { text: `întârziat cu ${-zile} ${-zile === 1 ? "zi" : "zile"}`, clasa: "late" };
  if (zile === 0) return { text: "azi", clasa: "soon" };
  if (zile === 1) return { text: "mâine", clasa: "soon" };
  if (zile <= 3) return { text: `în ${zile} zile`, clasa: "soon" };
  return null;
}
