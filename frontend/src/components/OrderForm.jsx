import { useState } from "react";
import { ETAPE, lei, pretPentru } from "../utils.js";

const GOL = { titlu: "", tip: "", prioritate: "", client: "", termen: "", etapa: 0 };
const TITLU_MAX = 100;
const CLIENT_MIN = 2;
const CLIENT_MAX = 60;
const FARA_EROARE = { camp: "", mesaj: "" };

// Data de azi, în forma aaaa-ll-zz, ca să poată fi comparată cu valoarea din câmpul de dată
function azi() {
  const d = new Date();
  const luna = String(d.getMonth() + 1).padStart(2, "0");
  const zi = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${luna}-${zi}`;
}

// Formular controlat: state-ul React este sursa de adevăr pentru câmpuri.
// Se folosește atât pentru comandă nouă, cât și (cu "initial") pentru editare.
export default function OrderForm({ initial, cuEtapa, textButon, onSubmit, onCancel }) {
  const [v, setV] = useState(initial ? { ...GOL, ...initial } : GOL);
  const [eroare, setEroare] = useState(FARA_EROARE);
  const [trimite, setTrimite] = useState(false);

  const set = (camp) => (e) => setV({ ...v, [camp]: e.target.value });

  // Atributele data-testid sunt pe formularul de adăugare; cel din dialogul de editare nu le are
  const tid = (nume) => (initial ? undefined : nume);

  // Prețul apare automat imediat ce sunt alese piesa și metalul
  const pret = pretPentru(v.tip, v.prioritate);

  // Întoarce problema găsită sau null dacă datele sunt valide
  function valideaza() {
    const titlu = v.titlu.trim();
    const client = v.client.trim();
    if (titlu === "") return { camp: "titlu", mesaj: "Denumirea piesei este obligatorie." };
    if (titlu.length > TITLU_MAX) return { camp: "titlu", mesaj: `Denumirea are maximum ${TITLU_MAX} de caractere.` };
    if (!v.tip) return { camp: "tip", mesaj: "Alege tipul piesei." };
    if (!v.prioritate) return { camp: "prioritate", mesaj: "Alege metalul prețios." };
    if (client === "") return { camp: "client", mesaj: "Numele clientului este obligatoriu." };
    if (client.length < CLIENT_MIN) return { camp: "client", mesaj: `Numele clientului are minimum ${CLIENT_MIN} caractere.` };
    if (client.length > CLIENT_MAX) return { camp: "client", mesaj: `Numele clientului are maximum ${CLIENT_MAX} de caractere.` };
    if (!initial && v.termen && v.termen < azi()) return { camp: "termen", mesaj: "Termenul de predare nu poate fi în trecut." };
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault(); // oprește reîncărcarea paginii
    const problema = valideaza();
    if (problema) {
      setEroare(problema);
      return;
    }
    setEroare(FARA_EROARE);
    setTrimite(true);
    try {
      await onSubmit({ ...v, titlu: v.titlu.trim(), client: v.client.trim(), pret, etapa: Number(v.etapa) });
      if (!initial) setV(GOL); // câmpurile se golesc doar dacă salvarea a reușit
    } catch (err) {
      setEroare({ camp: "", mesaj: `Nu am putut salva comanda: ${err.message}` });
    } finally {
      setTrimite(false);
    }
  }

  return (
    <form className="item-form" onSubmit={handleSubmit} noValidate data-testid={tid("form")}>
      <label className="full">
        Denumire piesă
        <input
          type="text"
          value={v.titlu}
          onChange={set("titlu")}
          placeholder="Ex: Inel de logodnă cu smarald"
          maxLength={TITLU_MAX}
          aria-invalid={eroare.camp === "titlu"}
          data-testid={tid("form-title")}
        />
      </label>
      <label>
        Tip piesă
        <select value={v.tip} onChange={set("tip")} required aria-invalid={eroare.camp === "tip"} data-testid={tid("form-tip")}>
          <option value="" disabled>Alege tipul piesei</option>
          <option value="inel">Inel</option>
          <option value="bratara">Brățară</option>
          <option value="colier">Colier</option>
          <option value="cercei">Cercei</option>
        </select>
      </label>
      <label>
        Metal prețios
        <select value={v.prioritate} onChange={set("prioritate")} required aria-invalid={eroare.camp === "prioritate"} data-testid={tid("form-prioritate")}>
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
        <input
          type="text"
          value={v.client}
          onChange={set("client")}
          placeholder="Ex: Maria Popescu"
          maxLength={CLIENT_MAX}
          aria-invalid={eroare.camp === "client"}
          data-testid={tid("form-client")}
        />
      </label>
      <label>
        Termen predare (opțional)
        <input type="date" value={v.termen} onChange={set("termen")} aria-invalid={eroare.camp === "termen"} data-testid={tid("form-termen")} />
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

      {eroare.mesaj && (
        <p className="error" data-testid={tid("form-error")}>
          {eroare.mesaj}
        </p>
      )}

      <div className="form-actions">
        {onCancel && <button type="button" className="btn-ghost" onClick={onCancel} disabled={trimite}>Anulează</button>}
        <button type="submit" disabled={trimite} data-testid={tid("form-submit")}>
          {trimite ? "Se salvează..." : textButon}
        </button>
      </div>
    </form>
  );
}
