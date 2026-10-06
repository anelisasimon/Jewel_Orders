// Datele de test si valorile permise 
const taskuri = [
  { id: 1, titlu: "Inel Solitar cu Diamant Solitaire", gata: false, prioritate: "aur-galben" },
  { id: 2, titlu: "Bratara Tennis cu Pietre Pretioase", gata: true, prioritate: "aur-alb" },
  { id: 3, titlu: "Colier cu Pandantiv Inima Gravat", gata: false, prioritate: "argint" },
];

const PRIORITATI = ["aur-galben", "aur-alb", "argint", "platina"];

// Listarea titlurilor 
function listeazaTitluri(lista) {
  return lista.map((t) => t.titlu);
}

// Numararea elementelor active 
function numaraActive(lista) {
  return lista.filter((t) => !t.gata).length;
}

// Cautarea dupa titlu 
function cautaDupaTitlu(lista, text) {
  const textCautat = text.toLowerCase();
  return lista.filter((t) => t.titlu.toLowerCase().includes(textCautat));
}

// Adaugarea unui element cu validare si nextId 
function nextId(lista) {
  return lista.reduce((max, t) => Math.max(max, t.id), 0) + 1;
}

function adaugaTask(lista, titlu, prioritate = "aur-galben") {
  const titluCurat = titlu ? titlu.trim() : "";

  if (!titluCurat) {
    console.log("Eroare validare: Titlul nu poate fi gol!");
    return lista;
  }

  if (!PRIORITATI.includes(prioritate)) {
    console.log(`Eroare validare: Prioritate/metal invalid: "${prioritate}"`);
    return lista;
  }

  const nou = {
    id: nextId(lista),
    titlu: titluCurat,
    gata: false,
    prioritate: prioritate,
  };

  return [...lista, nou];
}

// Comutarea starii si stergerea 
function comutaGata(lista, id) {
  return lista.map((t) =>
    t.id === id ? { ...t, gata: !t.gata } : t
  );
}

function stergeTask(lista, id) {
  return lista.filter((t) => t.id !== id);
}

// Testele din consola 
console.log("--- Citire ---");
console.log("Titluri:", listeazaTitluri(taskuri).join(", "));
console.log("Active:", numaraActive(taskuri));
console.log("Cautare 'inel':", listeazaTitluri(cautaDupaTitlu(taskuri, "inel")).join(", "));

console.log("--- Adaugare ---");
let lista = adaugaTask(taskuri, "Verighete Aur Platina", "platina");
console.log("Lista noua:", lista.length, "task-uri");
console.log("Originalul a ramas cu:", taskuri.length, "task-uri");

console.log("--- Modificare si stergere ---");
lista = comutaGata(lista, 1);
console.log("Dupa bifarea id 1, active:", numaraActive(lista));
lista = stergeTask(lista, 3);
console.log("Dupa stergerea id 3:", listeazaTitluri(lista).join(", "));

console.log("--- Validare ---");
adaugaTask(lista, "");
adaugaTask(lista, "Pandantiv", "cupru");