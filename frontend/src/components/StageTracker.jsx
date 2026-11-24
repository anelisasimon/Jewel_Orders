import { ETAPE } from "../utils.js";
import styles from "./StageTracker.module.css";

export default function StageTracker({ etapa, gata }) {
  const toate = gata || etapa === ETAPE.length - 1;
  return (
    <div
      className={gata ? `${styles.stages} ${styles.delivered}` : styles.stages}
      role="img"
      aria-label={`Etapa ${etapa + 1} din ${ETAPE.length}: ${ETAPE[etapa]}`}
    >
      {ETAPE.map((nume, i) => (
        <span
          key={nume}
          title={nume}
          className={i < etapa || toate ? `${styles.stage} ${styles.done}` : i === etapa ? `${styles.stage} ${styles.current}` : styles.stage}
        />
      ))}
    </div>
  );
}
