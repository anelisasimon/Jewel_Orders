import { ETAPE } from "../utils.js";

export default function StageTracker({ etapa }) {
  const gata = etapa === ETAPE.length - 1;
  return (
    <div className="stages" role="img" aria-label={`Etapa ${etapa + 1} din ${ETAPE.length}: ${ETAPE[etapa]}`}>
      {ETAPE.map((nume, i) => (
        <span
          key={nume}
          title={nume}
          className={i < etapa || gata ? "stage done" : i === etapa ? "stage current" : "stage"}
        />
      ))}
    </div>
  );
}
