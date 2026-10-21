import { useState } from "react";
import { ETAPE, lei, pretPentru } from "../utils.js";

const GOL = { titlu: "", tip: "", prioritate: "", client: "", termen: "", etapa: 0 };

export default function OrderForm({ initial, cuEtapa, textButon, onSubmit, onCancel }) {
  const [v, setV] = useState(initial ? { ...GOL, ...initial } : GOL);
  const set = (camp) => (e) => setV({ ...v, [camp]: e.target.value });

  // Prețul apare automat imediat ce sunt alese piesa și metalul
  const pret = pretPentru(v.tip, v.prioritate);

  function trimite(e) {
    e.preventDefault();
    const titlu = v.titlu.trim();
    const client = v.client.trim();
    if (!titlu || !client || !pret) return;
    onSubmit({ ...v, titlu, client, pret, etapa: Number(v.etapa) });
    if (!initial) setV(GOL);
  }

  return (
    <form className="item-form" onSubmit={trimite}>
      <label className="full">
        Denumire piesă
        <input type="text" value={v.titlu} onChange={set("titlu")} placeholder="Ex: Inel de logodnă cu smarald" required />
      </label>
      <label>
        Tip piesă
        <select value={v.tip} onChange={set("tip")} required>
          <option value="" disabled>Alege tipul piesei</option>
          <option value="inel">Inel</option>
          <option value="bratara">Brățară</option>
          <option value="colier">Colier</option>
          <option value="cercei">Cercei</option>
        </select>
      </label>
      <label>
        Metal prețios
        <select value={v.prioritate} onChange={set("prioritate")} required>
          <option value="" disabled>Alege metalul</option>
          <option value="aur-galben">Aur Galben 18K</option>
          <option value="aur-alb">Aur Alb 14K</option>
          <option value="argint">Argint 925</option>
          <option value="platina">Platină</option>
        </select>
      </label>

      {pret > 0 && (
        <div className="price-box">
          <div>
            <span className="price-label">Preț</span>
            <small>Calculat după tipul piesei și metalul ales</small>
          </div>
          <strong>{lei(pret)}</strong>
        </div>
      )}

      <label>
        Nume client
        <input type="text" value={v.client} onChange={set("client")} placeholder="Ex: Maria Popescu" required />
      </label>
      <label>
        Termen predare (opțional)
        <input type="date" value={v.termen} onChange={set("termen")} />
      </label>
      {cuEtapa && (
        <label className="full">
          Etapa de lucru
          <select value={v.etapa} onChange={set("etapa")}>
            {ETAPE.map((nume, i) => (
              <option key={nume} value={i}>{nume}</option>
            ))}
          </select>
        </label>
      )}
      <div className="form-actions">
        {onCancel && <button type="button" className="btn-ghost" onClick={onCancel}>Anulează</button>}
        <button type="submit">{textButon}</button>
      </div>
    </form>
  );
}
