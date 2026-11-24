import styles from "./Toasts.module.css";

export default function Toasts({ toasts, onClose }) {
  return (
    <div className={styles.toasts} aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={styles.toast}>
          <span>{t.text}</span>
          {t.undo && (
            <button
              type="button"
              onClick={() => {
                t.undo();
                onClose(t.id);
              }}
            >
              Anulează
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
