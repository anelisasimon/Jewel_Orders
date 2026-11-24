import { useState } from "react";
import { gasesteProdus } from "../catalog.js";
import { METALE, TIPURI } from "../constants.js";
import { ETAPE, lei, pretPentru } from "../utils.js";
import CatalogPicker from "./CatalogPicker.jsx";
import styles from "./OrderForm.module.css";

const GOL = { titlu: "", tip: "", prioritate: "", client: "", termen: "", etapa: 0, produsId: "", descriere: "", livrare: "ridicare", adresa: "" };
const DESCRIERE_MAX = 500;
const ADRESA_MIN = 8;
const ADRESA_MAX = 200;
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
  // Dacă se schimbă tipul sau metalul, piesa nu mai este cea din catalog
  const setPiesa = (camp) => (e) => setV({ ...v, [camp]: e.target.value, produsId: "" });

  // Alegerea unui produs din catalog completează piesa; "personalizată" (null) o golește
  function alegeProdus(p) {
    if (p) setV({ ...v, produsId: p.id, titlu: p.nume, tip: p.tip, prioritate: p.metal, descriere: "" });
    else if (v.produsId) setV({ ...v, produsId: "", titlu: "", tip: "", prioritate: "" });
  }

  // Atributele data-testid sunt pe formularul de adăugare; cel din dialogul de editare nu le are
  const tid = (nume) => (initial ? undefined : nume);

  // Prețul apare automat imediat ce sunt alese piesa și metalul
  const produs = v.produsId ? gasesteProdus(v.produsId) : null;
  const pret = produs ? produs.pret : pretPentru(v.tip, v.prioritate);

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
    if (v.livrare === "livrare") {
      const adresa = v.adresa.trim();
      if (adresa.length < ADRESA_MIN) return { camp: "adresa", mesaj: `Adresa de livrare are minimum ${ADRESA_MIN} caractere.` };
      if (adresa.length > ADRESA_MAX) return { camp: "adresa", mesaj: `Adresa are maximum ${ADRESA_MAX} de caractere.` };
    }
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
      await onSubmit({
        ...v,
        titlu: v.titlu.trim(),
        client: v.client.trim(),
        pret,
        etapa: Number(v.etapa),
        produsId: v.produsId || null,
        descriere: v.produsId ? "" : v.descriere.trim(),
        adresa: v.livrare === "livrare" ? v.adresa.trim() : "",
      });
      if (!initial) setV(GOL); // câmpurile se golesc doar dacă salvarea a reușit
    } catch (err) {
      setEroare({ camp: "", mesaj: `Nu am putut salva comanda: ${err.message}` });
    } finally {
      setTrimite(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate data-testid={tid("form")}>
      {!initial && (
        <div className={styles.full}>
          <CatalogPicker selectat={v.produsId} onSelect={alegeProdus} tid={tid} />
        </div>
      )}
      <label className={styles.full}>
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
        <select value={v.tip} onChange={setPiesa("tip")} required aria-invalid={eroare.camp === "tip"} data-testid={tid("form-tip")}>
          <option value="" disabled>Alege tipul piesei</option>
          {TIPURI.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </label>
      <label>
        Metal prețios
        <select value={v.prioritate} onChange={setPiesa("prioritate")} required aria-invalid={eroare.camp === "prioritate"} data-testid={tid("form-prioritate")}>
          <option value="" disabled>Alege metalul</option>
          {METALE.map((m) => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
      </label>

      {pret > 0 && (
        <div className={styles.priceBox}>
          <div>
            <span className={styles.priceLabel}>Preț</span>
            <small>{produs ? "Preț din catalog" : "Estimat după tipul piesei și metalul ales"}</small>
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
      {!v.produsId && (
        <label className={styles.full}>
          Detalii despre piesa dorită (opțional)
          <textarea
            value={v.descriere}
            onChange={set("descriere")}
            rows={3}
            maxLength={DESCRIERE_MAX}
            placeholder="Ex: inel cu gravură pe interior, piatră ovală, finisaj mat"
            data-testid={tid("form-descriere")}
          />
        </label>
      )}

      <fieldset className={styles.delivery}>
        <legend>Primirea comenzii</legend>
        <div className={styles.options} role="radiogroup" aria-label="Primirea comenzii">
          <label className={styles.option}>
            <input type="radio" name="livrare" value="ridicare" checked={v.livrare === "ridicare"} onChange={set("livrare")} data-testid={tid("form-livrare-ridicare")} />
            Ridicare din magazin
          </label>
          <label className={styles.option}>
            <input type="radio" name="livrare" value="livrare" checked={v.livrare === "livrare"} onChange={set("livrare")} data-testid={tid("form-livrare-adresa")} />
            Livrare la adresă
          </label>
        </div>
        {v.livrare === "livrare" && (
          <label className={styles.addr}>
            Adresa de livrare
            <input
              type="text"
              value={v.adresa}
              onChange={set("adresa")}
              placeholder="Strada, număr, oraș"
              maxLength={ADRESA_MAX}
              aria-invalid={eroare.camp === "adresa"}
              data-testid={tid("form-adresa")}
            />
          </label>
        )}
      </fieldset>

      {cuEtapa && (
        <label className={styles.full}>
          Etapa de lucru
          <select value={v.etapa} onChange={set("etapa")}>
            {ETAPE.map((nume, i) => (
              <option key={nume} value={i}>{nume}</option>
            ))}
          </select>
        </label>
      )}

      {eroare.mesaj && (
        <p className={`error ${styles.formError}`} data-testid={tid("form-error")}>
          {eroare.mesaj}
        </p>
      )}

      <div className={styles.actions}>
        {onCancel && <button type="button" className={styles.ghost} onClick={onCancel} disabled={trimite}>Anulează</button>}
        <button type="submit" disabled={trimite} data-testid={tid("form-submit")}>
          {trimite ? "Se salvează..." : textButon}
        </button>
      </div>
    </form>
  );
}
