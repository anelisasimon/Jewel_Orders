// Valorile fixe și etichetele lor, într-un singur loc.
export const TIPURI = [
  { value: "inel", label: "Inel" },
  { value: "bratara", label: "Brățară" },
  { value: "colier", label: "Colier" },
  { value: "cercei", label: "Cercei" },
];

export const METALE = [
  { value: "aur-galben", label: "Aur Galben 18K" },
  { value: "aur-alb", label: "Aur Alb 14K" },
  { value: "argint", label: "Argint 925" },
  { value: "platina", label: "Platină" },
];

export const ETICHETE_TIP = Object.fromEntries(TIPURI.map((t) => [t.value, t.label]));
export const ETICHETE_METAL = Object.fromEntries(METALE.map((m) => [m.value, m.label]));

export const ETICHETE_LIVRARE = {
  ridicare: "Ridicare din magazin",
  livrare: "Livrare la adresă",
};
