import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Toasts from "./Toasts.jsx";
import styles from "./Layout.module.css";

// NavLink marchează singur pagina curentă
function navClass({ isActive }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link;
}

// Tema de pornire: cea a sistemului de operare
function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function Layout() {
  const [tema, setTema] = useState(temaInitiala);
  const [toasts, setToasts] = useState([]);

  // Comutarea temei: state-ul pentru buton, atributul data-theme pentru CSS
  function handleTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    document.documentElement.dataset.theme = noua;
  }

  // Notificările sunt în layout, ca să funcționeze pe orice pagină (paginile le primesc prin Outlet)
  function showToast(text, undo) {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, text, undo }]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 5000);
  }

  function closeToast(id) {
    setToasts((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <>
      <header className={styles.header}>
        <button className={styles.themeToggle} onClick={handleTema} aria-pressed={tema === "dark"}>
          {tema === "dark" ? "Mod luminos" : "Mod întunecat"}
        </button>
        <h1 className={styles.title}>Jewel Orders</h1>
        <p className={styles.tagline}>Gestiunea comenzilor personalizate din atelierul de bijuterii.</p>
        <nav className={styles.nav} data-testid="nav">
          <NavLink to="/" end className={navClass}>
            Comenzi
          </NavLink>
          <NavLink to="/despre" className={navClass}>
            Despre
          </NavLink>
        </nav>
      </header>

      <main className={styles.main}>
        <Outlet context={{ showToast }} />
      </main>

      <footer className={styles.footer}>
        <p>Proiect Tehnologii Web - JewelOrders Atelier</p>
        <p className={styles.contact}>Strada Exemplu nr. 12, București · 07xx xxx xxx · contact@jewelorders.ro</p>
      </footer>

      <Toasts toasts={toasts} onClose={closeToast} />
    </>
  );
}
