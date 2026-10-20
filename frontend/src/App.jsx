const taskuri = [
  { id: 1, titlu: "Inel Solitar cu Diamant Solitaire", gata: false, prioritate: "aur-galben" },
  { id: 2, titlu: "Bratara Tennis cu Pietre Pretioase", gata: true, prioritate: "aur-alb" },
  { id: 3, titlu: "Colier cu Pandantiv Inima Gravat", gata: false, prioritate: "argint" },
];

export default function App() {
  const active = taskuri.filter((t) => !t.gata).length;

  return (
    <>
      <header className="app-header">
        <h1>JewelOrders</h1>
        <p>Gestiunea comenzilor personalizate din atelierul de bijuterii.</p>
        <p className="app-count">
          {taskuri.length} comenzi, dintre care {active} active
        </p>
      </header>

      <main className="container">
        <section className="panel">
          <h2>Comenzile mele</h2>
          {/* Temporar: date brute; componentele apar in Etapa 4 */}
          <pre>{JSON.stringify(taskuri, null, 2)}</pre>
        </section>
      </main>
    </>
  );
}