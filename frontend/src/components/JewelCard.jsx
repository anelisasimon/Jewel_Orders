import JewelIcon from "./JewelIcon.jsx";
import StageTracker from "./StageTracker.jsx";
import { ETAPE, ETICHETE_MATERIAL, formateazaData, infoTermen, lei } from "../utils.js";

const svg = { viewBox: "0 0 24 24", width: 17, height: 17, fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };

export default function JewelCard({ task, onAdvance, onEdit, onDelete }) {
  const gata = task.etapa === ETAPE.length - 1;
  const info = gata ? null : infoTermen(task.termen);
  const textAvans = gata ? "Mută înapoi în lucru" : task.etapa === ETAPE.length - 2 ? "Marchează ca livrată" : `Treci la: ${ETAPE[task.etapa + 1]}`;

  return (
    <li className={gata ? "item-card done" : "item-card"}>
      <div className="item-icon">
        <JewelIcon tip={task.tip} />
      </div>

      <div className="item-main">
        <h3>{task.titlu}</h3>
        <div className="item-meta">
          <span className={`badge badge-${task.prioritate}`}>{ETICHETE_MATERIAL[task.prioritate] || task.prioritate}</span>
          {task.client && <span className="meta-item">Client: {task.client}</span>}
          {task.termen && (
            <span className={`meta-item ${info ? info.clasa : ""}`}>
              Termen: {formateazaData(task.termen)}
              {info && ` · ${info.text}`}
            </span>
          )}
          {task.pret > 0 && (
            <span className="meta-item price">
              {lei(task.pret)}
            </span>
          )}
        </div>
        <StageTracker etapa={task.etapa} />
      </div>

      <div className="item-actions">
        <span className={gata ? "status status-done" : "status"}>
          <span className="status-dot" />
          {ETAPE[task.etapa]}
        </span>
        <div className="item-buttons">
          <button type="button" className="icon-btn" onClick={() => onAdvance(task.id)} title={textAvans} aria-label={textAvans}>
            {gata ? (
              <svg {...svg}><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" /></svg>
            ) : (
              <svg {...svg}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
            )}
          </button>
          <button type="button" className="icon-btn" onClick={() => onEdit(task)} title="Editează comanda" aria-label="Editează comanda">
            <svg {...svg}><path d="M4 20h4L19 9l-4-4L4 16z" /><path d="m13.5 6.5 4 4" /></svg>
          </button>
          <button type="button" className="icon-btn icon-btn-danger" onClick={() => onDelete(task.id)} title="Șterge comanda" aria-label="Șterge comanda">
            <svg {...svg}><path d="M4 7h16" /><path d="M9 7V4h6v3" /><path d="M6 7l1 13h10l1-13" /></svg>
          </button>
        </div>
      </div>
    </li>
  );
}
