import { useEffect, useRef, useState } from "react";
import JewelList from "./components/JewelList.jsx";
import OrderForm from "./components/OrderForm.jsx";
import { ETAPE, lei, pretPentru } from "./utils.js";

const CHEIE = "jewelorders:comenzi-v2";
const CHEIE_VECHE = "jewelorders:comenzi";
const CHEIE_TEMA = "jewelorders:tema-aleasa";
const ULTIMA = ETAPE.length - 1;

const COMENZI_INITIALE = [
  { id: 1, titlu: "Inel Solitar cu Diamant Solitaire", tip: "inel", prioritate: "aur-galben", etapa: 2, client: "Maria Popescu", termen: "2026-10-23", pret: 4500 },
  { id: 2, titlu: "Bratara Tennis cu Pietre Pretioase", tip: "bratara", prioritate: "aur-alb", etapa: 4, client: "Andrei Ionescu", termen: "2026-10-02", pret: 3200 },
  { id: 3, titlu: "Colier cu Pandantiv Inima Gravat", tip: "colier", prioritate: "argint", etapa: 0, client: "Elena Dumitru", termen: "2026-12-01", pret: 680 },
];

const FILTRE = [
  { id: "toate", eticheta: "Toate" },
  { id: "active", eticheta: "În lucru" },
  { id: "livrate", eticheta: "Livrate" },
];

// Acceptă și comenzile salvate în varianta veche (cu "gata")
function normalizeaza(t) {
  const tip = t.tip || "inel";
  return {
    id: t.id,
    titlu: t.titlu,
    tip,
    prioritate: t.prioritate,
    client: t.client || "",
    termen: t.termen || "",
    etapa: typeof t.etapa === "number" ? t.etapa : t.gata ? ULTIMA : 1,
    pret: t.pret > 0 ? t.pret : pretPentru(tip, t.prioritate),
  };
}

function incarca() {
  try {
    for (const cheie of [CHEIE, CHEIE_VECHE]) {
      const salvat = JSON.parse(localStorage.getItem(cheie));
      if (Array.isArray(salvat)) return salvat.map(normalizeaza);
    }
  } catch {
    /* folosim valorile implicite */
  }
  return COMENZI_INITIALE;
}

// Implicit tema este cea luminoasă; cea întunecată apare doar dacă o alegi tu
function temaInitiala() {
  try {
    return localStorage.getItem(CHEIE_TEMA) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

function EditDialog({ comanda, onSave, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && !ref.current.open) ref.current.showModal();
  }, []);

  return (
    <dialog
      ref={ref}
      className="dialog"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current.close()}
    >
      <div className="panel">
        <h2>Editează comanda</h2>
        <OrderForm initial={comanda} cuEtapa textButon="Salvează modificările" onSubmit={onSave} onCancel={() => ref.current.close()} />
      </div>
    </dialog>
  );
}

export default function App() {
  const [taskuri, setTaskuri] = useState(incarca);
  const [tema, setTema] = useState(temaInitiala);
  const [filtru, setFiltru] = useState("toate");
  const [cauta, setCauta] = useState("");
  const [sortare, setSortare] = useState("adaugare");
  const [editata, setEditata] = useState(null);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem(CHEIE, JSON.stringify(taskuri));
    } catch {
      /* stocarea poate fi indisponibilă */
    }
  }, [taskuri]);

  useEffect(() => {
    document.documentElement.dataset.theme = tema;
  }, [tema]);

  function schimbaTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    try {
      localStorage.setItem(CHEIE_TEMA, noua);
    } catch {
      /* ignorăm */
    }
  }

  function arataToast(text, undo) {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, text, undo }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 5000);
  }

  const inchideToast = (id) => setToasts((t) => t.filter((x) => x.id !== id));

  function adauga(date) {
    setTaskuri((c) => [...c, { ...date, id: Date.now() }]);
    arataToast("Comanda a fost înregistrată.");
  }

  function avanseaza(id) {
    const c = taskuri.find((t) => t.id === id);
    if (!c) return;
    const etapa = c.etapa === ULTIMA ? ULTIMA - 1 : c.etapa + 1;
    setTaskuri(taskuri.map((t) => (t.id === id ? { ...t, etapa } : t)));
    arataToast(etapa === ULTIMA ? "Comanda a fost marcată ca livrată." : `Etapa: ${ETAPE[etapa]}.`);
  }

  function salveaza(date) {
    setTaskuri(taskuri.map((t) => (t.id === date.id ? date : t)));
    setEditata(null);
    arataToast("Modificările au fost salvate.");
  }

  function sterge(id) {
    const index = taskuri.findIndex((t) => t.id === id);
    if (index < 0) return;
    const comanda = taskuri[index];
    setTaskuri(taskuri.filter((t) => t.id !== id));
    arataToast("Comanda a fost ștearsă.", () =>
      setTaskuri((c) => {
        const copie = [...c];
        copie.splice(index, 0, comanda);
        return copie;
      })
    );
  }

  const active = taskuri.filter((t) => t.etapa < ULTIMA);
  const valoare = active.reduce((s, t) => s + (t.pret || 0), 0);
  const numere = { toate: taskuri.length, active: active.length, livrate: taskuri.length - active.length };

  const q = cauta.trim().toLowerCase();
  const vizibile = taskuri
    .filter((t) => (filtru === "active" ? t.etapa < ULTIMA : filtru === "livrate" ? t.etapa === ULTIMA : true))
    .filter((t) => !q || t.titlu.toLowerCase().includes(q) || (t.client || "").toLowerCase().includes(q))
    .sort((a, b) =>
      sortare === "termen" ? (a.termen || "9999").localeCompare(b.termen || "9999")
      : sortare === "pret" ? (b.pret || 0) - (a.pret || 0)
      : 0
    );

  return (
    <>
      <header className="app-header">
        <button
          type="button"
          className="icon-btn theme-toggle"
          onClick={schimbaTema}
          title={tema === "dark" ? "Mod luminos" : "Mod întunecat"}
          aria-label={tema === "dark" ? "Comută pe modul luminos" : "Comută pe modul întunecat"}
        >
          {tema === "dark" ? (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" /></svg>
          )}
        </button>
        <h1>Jewel Orders</h1>
        <p>Gestiunea comenzilor personalizate din atelierul de bijuterii.</p>
        <p className="app-count">
          {taskuri.length} comenzi, dintre care {active.length} active
          {valoare > 0 && ` · ${lei(valoare)} în lucru`}
        </p>
      </header>

      <main className="container">
        <section className="panel">
          <h2>Comandă nouă</h2>
          <OrderForm textButon="Înregistrează comanda" onSubmit={adauga} />
        </section>

        <div className="ornament" aria-hidden="true"><span /></div>

        <section className="panel">
          <h2>Comenzile mele</h2>
          <div className="filters" role="group" aria-label="Filtrare comenzi">
            {FILTRE.map((f) => (
              <button key={f.id} type="button" className={filtru === f.id ? "filter-btn active" : "filter-btn"} onClick={() => setFiltru(f.id)}>
                {f.eticheta} <span className="filter-count">{numere[f.id]}</span>
              </button>
            ))}
          </div>
          <div className="toolbar">
            <input type="search" className="field" value={cauta} onChange={(e) => setCauta(e.target.value)} placeholder="Caută după piesă sau client…" aria-label="Caută comenzi" />
            <select className="field" value={sortare} onChange={(e) => setSortare(e.target.value)} aria-label="Sortare">
              <option value="adaugare">Ordinea adăugării</option>
              <option value="termen">Termen apropiat</option>
              <option value="pret">Preț descrescător</option>
            </select>
          </div>
          <JewelList
            taskuri={vizibile}
            onAdvance={avanseaza}
            onEdit={setEditata}
            onDelete={sterge}
            mesajGol={taskuri.length === 0 ? undefined : "Nicio comandă nu se potrivește căutării."}
          />
        </section>
      </main>

      <footer className="app-footer">
        <p>Proiect Tehnologii Web - JewelOrders Atelier</p>
        <p className="contact">Strada Exemplu nr. 12, București · 07xx xxx xxx · contact@jewelorders.ro</p>
      </footer>

      {editata && <EditDialog key={editata.id} comanda={editata} onSave={salveaza} onClose={() => setEditata(null)} />}

      <div className="toasts" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className="toast">
            <span>{t.text}</span>
            {t.undo && (
              <button type="button" onClick={() => { t.undo(); inchideToast(t.id); }}>Anulează</button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}