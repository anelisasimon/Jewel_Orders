import { ETAPE } from "../utils.js";

// 4 etape de lucru + o ultimă bară, "Livrată", care se umple când comanda e bifată
const PASI = [...ETAPE, "Livrată"];

export default function StageTracker({ etapa, gata }) {
  return (
    <div
      className="stages"
      role="img"
      aria-label={gata ? "Comandă livrată" : `Etapa ${etapa + 1} din ${ETAPE.length}: ${ETAPE[etapa]}`}
    >
      {PASI.map((nume, i) => (
        <span
          key={nume}
          title={nume}
          className={gata || i < etapa ? "stage done" : i === etapa ? "stage current" : "stage"}
        />
      ))}
    </div>
  );
}
