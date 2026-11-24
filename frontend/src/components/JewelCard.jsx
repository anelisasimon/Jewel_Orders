import { Link } from "react-router-dom";
import JewelIcon from "./JewelIcon.jsx";
import ProductImage from "./ProductImage.jsx";
import StageTracker from "./StageTracker.jsx";
import { ETICHETE_LIVRARE } from "../constants.js";
import { ETAPE, ETICHETE_MATERIAL, formateazaData, infoTermen, lei } from "../utils.js";
import styles from "./JewelCard.module.css";

const svg = { viewBox: "0 0 24 24", width: 17, height: 17, fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };

export default function JewelCard({ task, onToggle, onAdvance, onEdit, onDelete }) {
  const info = task.gata ? null : infoTermen(task.termen);
  const ultimaEtapa = task.etapa === ETAPE.length - 1;
  const textAvans = task.gata
    ? "Comanda este livrată"
    : ultimaEtapa
      ? "Ultima etapă de lucru: bifează comanda ca livrată"
      : `Treci la: ${ETAPE[task.etapa + 1]}`;

  return (
    <li className={task.gata ? `${styles.card} ${styles.done}` : styles.card} data-testid="item" data-id={task.id}>
      <div className={styles.icon}>
        {task.produsId ? <ProductImage produsId={task.produsId} tip={task.tip} metal={task.prioritate} /> : <JewelIcon tip={task.tip} />}
      </div>

      <div className={styles.main}>
        <div className={styles.taskMain}>
          <input
            type="checkbox"
            checked={task.gata}
            onChange={() => onToggle(task.id)}
            aria-label={`Marchează ${task.titlu} ca livrată`}
            data-testid="item-toggle"
          />
          <div>
            <h3>
              <Link to={`/comenzi/${task.id}`} className={styles.title} data-testid="item-link">
                {task.titlu}
              </Link>
            </h3>
            <div className={styles.meta}>
              <span className={`badge badge-${task.prioritate}`}>{ETICHETE_MATERIAL[task.prioritate] || task.prioritate}</span>
              {task.client && <span className={styles.metaItem}>Client: {task.client}</span>}
              {task.termen && (
                <span className={info ? `${styles.metaItem} ${styles[info.clasa]}` : styles.metaItem}>
                  Termen: {formateazaData(task.termen)}
                  {info && ` · ${info.text}`}
                </span>
              )}
              {task.livrare && <span className={styles.metaItem}>{ETICHETE_LIVRARE[task.livrare]}</span>}
              {task.pret > 0 && <span className={`${styles.metaItem} ${styles.price}`}>{lei(task.pret)}</span>}
            </div>
          </div>
        </div>
        <StageTracker etapa={task.etapa} gata={task.gata} />
      </div>

      <div className={styles.actions}>
        <span className={task.gata ? `${styles.status} ${styles.statusDone}` : styles.status}>
          <span className={styles.dot} />
          {task.gata ? "Livrată" : ETAPE[task.etapa]}
        </span>
        <div className={styles.buttons}>
          <button type="button" className={styles.iconBtn} onClick={() => onAdvance(task.id)} disabled={task.gata || ultimaEtapa} title={textAvans} aria-label={textAvans}>
            <svg {...svg}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
          </button>
          <button type="button" className={styles.iconBtn} onClick={() => onEdit(task)} title="Editează comanda" aria-label={`Editează ${task.titlu}`}>
            <svg {...svg}><path d="M4 20h4L19 9l-4-4L4 16z" /><path d="m13.5 6.5 4 4" /></svg>
          </button>
          <button type="button" className={`${styles.iconBtn} ${styles.danger}`} onClick={() => onDelete(task.id)} title="Șterge comanda" aria-label={`Șterge ${task.titlu}`} data-testid="item-delete">
            <svg {...svg}><path d="M4 7h16" /><path d="M9 7V4h6v3" /><path d="M6 7l1 13h10l1-13" /></svg>
          </button>
        </div>
      </div>
    </li>
  );
}
