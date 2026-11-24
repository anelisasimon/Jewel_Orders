import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchComanda } from "../api.js";
import JewelIcon from "../components/JewelIcon.jsx";
import ProductImage from "../components/ProductImage.jsx";
import StageTracker from "../components/StageTracker.jsx";
import { gasesteProdus } from "../catalog.js";
import { ETICHETE_LIVRARE, ETICHETE_TIP } from "../constants.js";
import { ETAPE, ETICHETE_MATERIAL, formateazaData, infoTermen, lei } from "../utils.js";
import styles from "./ComandaDetaliuPage.module.css";

export default function ComandaDetaliuPage() {
  const { id } = useParams(); // text din URL, de exemplu "3"
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Se reîncarcă dacă se schimbă id-ul din adresă
  useEffect(() => {
    let ignore = false;
    fetchComanda(id)
      .then((data) => {
        if (!ignore) {
          setTask(data);
          setError(null); // o eroare de la un id anterior nu mai este valabilă
        }
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return (
      <p className="info" data-testid="loading">
        Se încarcă comanda...
      </p>
    );
  }

  if (error || !task) {
    return (
      <section className="panel">
        <p className="error" data-testid="error">
          Comanda nu a putut fi încărcată: {error}
        </p>
        <Link to="/" className={styles.back}>
          Înapoi la listă
        </Link>
      </section>
    );
  }

  const info = task.gata ? null : infoTermen(task.termen);
  const produs = task.produsId ? gasesteProdus(task.produsId) : null;

  return (
    <section className={`panel ${styles.detail}`} data-testid="detail">
      <Link to="/" className={styles.back}>
        ← Înapoi la listă
      </Link>

      <div className={styles.head}>
        <div className={produs ? `${styles.icon} ${styles.photo}` : styles.icon}>
          {produs ? <ProductImage produsId={task.produsId} alt={produs.nume} /> : <JewelIcon tip={task.tip} />}
        </div>
        <div>
          <h2 className={task.gata ? styles.done : undefined} data-testid="detail-title">
            {task.titlu}
          </h2>
        </div>
      </div>

      <StageTracker etapa={task.etapa} gata={task.gata} />

      <dl className={styles.fields}>
        <dt>Produs</dt>
        <dd>{produs ? `Din catalog: ${produs.nume}` : "Piesă personalizată"}</dd>
        {task.descriere && (
          <>
            <dt>Detalii</dt>
            <dd>{task.descriere}</dd>
          </>
        )}
        <dt>Tip piesă</dt>
        <dd>{ETICHETE_TIP[task.tip] || task.tip}</dd>
        <dt>Metal prețios</dt>
        <dd>
          <span className={`badge badge-${task.prioritate}`}>{ETICHETE_MATERIAL[task.prioritate] || task.prioritate}</span>
        </dd>
        <dt>Client</dt>
        <dd>{task.client || "—"}</dd>
        <dt>Termen predare</dt>
        <dd className={info ? styles[info.clasa] : undefined}>
          {task.termen ? formateazaData(task.termen) : "—"}
          {info && ` · ${info.text}`}
        </dd>
        <dt>Preț</dt>
        <dd className={styles.price}>{task.pret > 0 ? lei(task.pret) : "—"}</dd>
        <dt>Primire</dt>
        <dd>
          {ETICHETE_LIVRARE[task.livrare] || "—"}
          {task.livrare === "livrare" && task.adresa && ` · ${task.adresa}`}
        </dd>
        <dt>Etapa de lucru</dt>
        <dd>{task.gata ? "Livrată" : ETAPE[task.etapa]}</dd>
        <dt>ID comandă</dt>
        <dd>{task.id}</dd>
      </dl>
    </section>
  );
}
