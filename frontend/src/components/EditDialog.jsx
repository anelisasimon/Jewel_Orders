import { useEffect, useRef } from "react";
import OrderForm from "./OrderForm.jsx";
import styles from "./EditDialog.module.css";

// Dialogul de editare: <dialog> nativ, deschis cu showModal()
export default function EditDialog({ comanda, onSave, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && !ref.current.open) ref.current.showModal();
  }, []);

  return (
    <dialog ref={ref} className={styles.dialog} onClose={onClose} onClick={(e) => e.target === ref.current && ref.current.close()}>
      <div className="panel">
        <h2>Editează comanda</h2>
        <OrderForm initial={comanda} cuEtapa textButon="Salvează modificările" onSubmit={onSave} onCancel={() => ref.current.close()} />
      </div>
    </dialog>
  );
}
