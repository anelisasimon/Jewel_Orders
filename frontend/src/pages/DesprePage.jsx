import styles from "./DesprePage.module.css";

export default function DesprePage() {
  return (
    <section className={`panel ${styles.about}`}>
      <h2>Despre JewelOrders</h2>
      <p>
        JewelOrders este o aplicație pentru gestiunea comenzilor personalizate dintr-un atelier de bijuterii: de la
        proiectare și turnare, până la montarea pietrelor, finisare și predarea către client. A fost construită pas cu
        pas, pe parcursul semestrului, în cadrul proiectului de Tehnologii Web.
      </p>
      <p className={styles.stack}>Stack: React, Vite, React Router, CSS Modules, json-server.</p>
    </section>
  );
}
