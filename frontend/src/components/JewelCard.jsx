import JewelIcon from "./JewelIcon.jsx";
import StageTracker from "./StageTracker.jsx";
import { ETAPE, ETICHETE_MATERIAL, formateazaData, infoTermen, lei } from "../utils.js";

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
    <li className={task.gata ? "item-card done" : "item-card"}>
      <div className="item-icon">
        <JewelIcon tip={task.tip} />
      </div>

      <div className="item-main">
        <label className="task-main">
          <input type="checkbox" checked={task.gata} onChange={() => onToggle(task.id)} />
          <div>
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
              {task.pret > 0 && <span className="meta-item price">{lei(task.pret)}</span>}
            </div>
          </div>
        </label>
        <StageTracker etapa={task.etapa} gata={task.gata} />
      </div>

      <div className="item-actions">
        <span className={task.gata ? "status status-done" : "status"}>
          <span className="status-dot" />
          {task.gata ? "Livrată" : ETAPE[task.etapa]}
        </span>
        <div className="item-buttons">
          <button type="button" className="icon-btn" onClick={() => onAdvance(task.id)} disabled={task.gata || ultimaEtapa} title={textAvans} aria-label={textAvans}>
            <svg {...svg}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
          </button>
          <button type="button" className="icon-btn" onClick={() => onEdit(task)} title="Editează comanda" aria-label={`Editează ${task.titlu}`}>
            <svg {...svg}><path d="M4 20h4L19 9l-4-4L4 16z" /><path d="m13.5 6.5 4 4" /></svg>
          </button>
          <button type="button" className="icon-btn icon-btn-danger" onClick={() => onDelete(task.id)} title="Șterge comanda" aria-label={`Șterge ${task.titlu}`}>
            <svg {...svg}><path d="M4 7h16" /><path d="M9 7V4h6v3" /><path d="M6 7l1 13h10l1-13" /></svg>
          </button>
        </div>
      </div>
    </li>
  );
}
