import JewelCard from "./JewelCard.jsx";

export default function JewelList({ taskuri, onAdvance, onEdit, onDelete, mesajGol }) {
  if (!taskuri || taskuri.length === 0) {
    return (
      <div className="empty">
        <svg viewBox="0 0 64 64" width="54" height="54" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 10h24l14 16-26 30L6 26z" />
          <path d="M6 26h52M20 10l12 16 12-16M32 56 20 26M32 56l12-30" />
        </svg>
        <p>{mesajGol || "Nu există nicio comandă înregistrată."}</p>
      </div>
    );
  }

  return (
    <ul className="item-list">
      {taskuri.map((task) => (
        <JewelCard key={task.id} task={task} onAdvance={onAdvance} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
}
