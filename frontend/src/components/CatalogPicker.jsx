import { CATALOG } from "../catalog.js";
import { lei } from "../utils.js";
import ProductImage from "./ProductImage.jsx";
import styles from "./CatalogPicker.module.css";

// Alegerea produsului: din catalog (cu poză) sau piesă personalizată.
export default function CatalogPicker({ selectat, onSelect, tid }) {
  return (
    <div className={styles.picker}>
      <span className={styles.title}>Alege un produs din catalog sau cere o piesă personalizată</span>
      <div className={styles.grid} role="radiogroup" aria-label="Produse din catalog">
        {CATALOG.map((p) => (
          <button
            key={p.id}
            type="button"
            role="radio"
            aria-checked={selectat === p.id}
            className={selectat === p.id ? `${styles.tile} ${styles.selected}` : styles.tile}
            onClick={() => onSelect(p)}
            data-testid={tid(`catalog-${p.id}`)}
          >
            <span className={styles.image}>
              <ProductImage produsId={p.id} alt={p.nume} />
            </span>
            <span className={styles.name}>{p.nume}</span>
            <span className={styles.price}>{lei(p.pret)}</span>
          </button>
        ))}
        <button
          type="button"
          role="radio"
          aria-checked={!selectat}
          className={!selectat ? `${styles.tile} ${styles.custom} ${styles.selected}` : `${styles.tile} ${styles.custom}`}
          onClick={() => onSelect(null)}
          data-testid={tid("catalog-custom")}
        >
          <span className={styles.plus} aria-hidden="true">+</span>
          <span className={styles.name}>Piesă personalizată</span>
          <span className={styles.hint}>Descrii tu ce îți dorești</span>
        </button>
      </div>
    </div>
  );
}
