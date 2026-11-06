import { useEffect, useRef, useState } from "react";
import JewelList from "./components/JewelList.jsx";
import OrderForm from "./components/OrderForm.jsx";
import { fetchComenzi } from "./api.js";
import { ETAPE, lei } from "./utils.js";

const FILTRE = [
  { id: "toate", eticheta: "Toate" },
  { id: "active", eticheta: "În lucru" },
  { id: "livrate", eticheta: "Livrate" },
];

// Tema de pornire: cea a sistemului de operare
function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function EditDialog({ comanda, onSave, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && !ref.current.open) ref.current.showModal();
  }, []);

  return (
    <dialog ref={ref} className="dialog" onClose={onClose} onClick={(e) => e.target === ref.current && ref.current.close()}>
      <div className="panel">
        <h2>Editează comanda</h2>
        <OrderForm initial={comanda} cuEtapa textButon="Salvează modificările" onSubmit={onSave} onCancel={() => ref.current.close()} />
      </div>
    </dialog>
  );
}

export default function App() {
  const [taskuri, setTaskuri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tema, setTema] = useState(temaInitiala);
  const [filtru, setFiltru] = useState("toate");
  const [cauta, setCauta] = useState("");
  const [sortare, setSortare] = useState("adaugare");
  const [editata, setEditata] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Rulează o singură dată, după prima randare
  useEffect(() => {
    let ignore = false; // nu se setează state dacă pagina s-a închis între timp
    async function load() {
      try {
        const data = await fetchComenzi();
        if (!ignore) setTaskuri(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  // Actualizări imutabile: listă nouă, obiect nou pentru elementul schimbat
  function handleToggle(id) {
    const c = taskuri.find((t) => t.id === id);
    setTaskuri((prev) => prev.map((t) => (t.id === id ? { ...t, gata: !t.gata } : t)));
    if (c) showToast(c.gata ? "Comanda a fost readusă în lucru." : "Comanda a fost marcată ca livrată.");
  }

  function handleDelete(id) {
    const index = taskuri.findIndex((t) => t.id === id);
    if (index < 0) return;
    const comanda = taskuri[index];
    setTaskuri((prev) => prev.filter((t) => t.id !== id));
    showToast("Comanda a fost ștearsă.", () =>
      setTaskuri((prev) => [...prev.slice(0, index), comanda, ...prev.slice(index)])
    );
  }

  function handleAdd(date) {
    setTaskuri((prev) => [...prev, { ...date, id: Date.now(), gata: false }]);
    showToast("Comanda a fost înregistrată.");
  }

  function handleAdvance(id) {
    const c = taskuri.find((t) => t.id === id);
    if (!c || c.gata || c.etapa >= ETAPE.length - 1) return;
    setTaskuri((prev) => prev.map((t) => (t.id === id ? { ...t, etapa: t.etapa + 1 } : t)));
    showToast(`Etapa: ${ETAPE[c.etapa + 1]}.`);
  }

  function handleSave(date) {
    setTaskuri((prev) => prev.map((t) => (t.id === date.id ? date : t)));
    setEditata(null);
    showToast("Modificările au fost salvate.");
  }

  // Comutarea temei: state-ul pentru buton, atributul data-theme pentru CSS
  function handleTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    document.documentElement.dataset.theme = noua;
  }

  function showToast(text, undo) {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, text, undo }]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 5000);
  }

  // Valori derivate: se recalculează la fiecare randare
  const active = taskuri.filter((t) => !t.gata).length;
  const valoare = taskuri.filter((t) => !t.gata).reduce((s, t) => s + (t.pret || 0), 0);
  const numere = { toate: taskuri.length, active, livrate: taskuri.length - active };

  const q = cauta.trim().toLowerCase();
  const vizibile = taskuri
    .filter((t) => (filtru === "active" ? !t.gata : filtru === "livrate" ? t.gata : true))
    .filter((t) => !q || t.titlu.toLowerCase().includes(q) || (t.client || "").toLowerCase().includes(q))
    .sort((a, b) =>
      sortare === "termen" ? (a.termen || "9999").localeCompare(b.termen || "9999")
      : sortare === "pret" ? (b.pret || 0) - (a.pret || 0)
      : 0
    );

  return (
    <>
      <header className="app-header">
        <button className="theme-toggle" onClick={handleTema} aria-pressed={tema === "dark"}>
          {tema === "dark" ? "Mod luminos" : "Mod întunecat"}
        </button>
        <h1>Jewel Orders</h1>
        <p>Gestiunea comenzilor personalizate din atelierul de bijuterii.</p>
        <p className="app-count">
          {taskuri.length} comenzi, dintre care {active} active
          {valoare > 0 && ` · ${lei(valoare)} în lucru`}
        </p>
      </header>

      <main className="container">
        <section className="panel">
          <h2>Comandă nouă</h2>
          <OrderForm textButon="Înregistrează comanda" onSubmit={handleAdd} />
        </section>

        <div className="ornament" aria-hidden="true"><span /></div>

        <section className="panel">
          <h2>Comenzile mele</h2>
          {loading && <p className="info">Se încarcă comenzile...</p>}
          {error && (
            <p className="error">
              Nu am putut încărca datele: {error}. Rulează <code>npm run api</code>?
            </p>
          )}
          {!loading && !error && (
            <>
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
                onToggle={handleToggle}
                onAdvance={handleAdvance}
                onEdit={setEditata}
                onDelete={handleDelete}
                mesajGol={taskuri.length === 0 ? undefined : "Nicio comandă nu se potrivește căutării."}
              />
            </>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>Proiect Tehnologii Web - JewelOrders Atelier</p>
        <p className="contact">Strada Exemplu nr. 12, București · 07xx xxx xxx · contact@jewelorders.ro</p>
      </footer>

      {editata && <EditDialog key={editata.id} comanda={editata} onSave={handleSave} onClose={() => setEditata(null)} />}

      <div className="toasts" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className="toast">
            <span>{t.text}</span>
            {t.undo && (
              <button type="button" onClick={() => { t.undo(); setToasts((prev) => prev.filter((x) => x.id !== t.id)); }}>Anulează</button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
