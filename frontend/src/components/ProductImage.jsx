import { gasesteProdus } from "../catalog.js";

const METALE = {
  "aur-galben": ["#f8e7ad", "#c9a043"],
  "aur-alb": ["#f7f9fb", "#a9b7c3"],
  argint: ["#f3f5f6", "#b2bac1"],
  platina: ["#f6f0fa", "#b6a7c8"],
};
const PIETRE = {
  diamant: ["#ffffff", "#cfe9f7"],
  safir: ["#7f9cf0", "#2c47b0"],
  rubin: ["#ee6b82", "#b01f3a"],
  smarald: ["#6fd3a3", "#1f8c5f"],
  perla: ["#ffffff", "#e9dfd0"],
};

// Ilustrație desenată a produsului (inel, brățară, colier, cercei), colorată după metal și piatră.
// Dacă produsul din catalog are o poză reală (câmpul foto), se afișează aceasta.
export default function ProductImage({ produsId, tip, metal, piatra, alt = "" }) {
  const produs = produsId ? gasesteProdus(produsId) : null;
  if (produs?.foto) return <img src={produs.foto} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />;

  const t = produs?.tip || tip;
  const m = METALE[produs?.metal || metal] || METALE["aur-galben"];
  const p = PIETRE[produs?.piatra || piatra] || PIETRE.diamant;
  const uid = `${t}-${produs?.id || "x"}-${m[1].slice(1)}-${p[1].slice(1)}`;
  const gm = `m-${uid}`;
  const gp = `p-${uid}`;

  const gem = (cx, cy, r) => (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={`url(#${gp})`} stroke={m[1]} strokeWidth="1.5" />
      <path d={`M${cx - r * 0.5} ${cy - r * 0.2} L${cx} ${cy - r * 0.7} L${cx + r * 0.5} ${cy - r * 0.2}`} stroke="#fff" strokeOpacity=".8" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </g>
  );

  let corp = null;
  if (t === "inel") {
    corp = (
      <>
        <circle cx="60" cy="76" r="27" fill="none" stroke={`url(#${gm})`} strokeWidth="8" />
        <path d="M50 52 L60 44 L70 52 L66 58 L54 58 Z" fill={m[1]} />
        {gem(60, 40, 11)}
      </>
    );
  } else if (t === "bratara") {
    const pietre = [26, 38, 50, 62, 74, 86, 98].map((x, i) => {
      const y = 86 - Math.sin(((x - 22) / 80) * Math.PI) * 6;
      return gem(x, y, 5);
    });
    corp = (
      <>
        <ellipse cx="60" cy="62" rx="40" ry="24" fill="none" stroke={`url(#${gm})`} strokeWidth="9" />
        <path d="M20 66 Q60 106 100 66" fill="none" stroke={`url(#${gm})`} strokeWidth="9" strokeLinecap="round" />
        {pietre}
      </>
    );
  } else if (t === "colier") {
    corp = (
      <>
        <path d="M20 26 Q60 104 100 26" fill="none" stroke={`url(#${gm})`} strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="60" cy="76" r="3" fill={m[1]} />
        {gem(60, 88, 12)}
      </>
    );
  } else {
    corp = [38, 82].map((x) => (
      <g key={x}>
        <path d={`M${x} 14 q8 0 8 8`} fill="none" stroke={m[1]} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx={x + 4} cy="30" r="5" fill="none" stroke={`url(#${gm})`} strokeWidth="3.5" />
        <line x1={x + 4} y1="35" x2={x + 4} y2="52" stroke={m[1]} strokeWidth="2.5" />
        <path d={`M${x + 4} 52 C${x - 12} 66 ${x - 6} 92 ${x + 4} 96 C${x + 14} 92 ${x + 20} 66 ${x + 4} 52 Z`} fill={`url(#${gp})`} stroke={m[1]} strokeWidth="2.5" strokeLinejoin="round" />
      </g>
    ));
  }

  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%" role="img" aria-label={alt} aria-hidden={alt ? undefined : true}>
      <defs>
        <linearGradient id={gm} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={m[0]} />
          <stop offset="1" stopColor={m[1]} />
        </linearGradient>
        <radialGradient id={gp} cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor={p[0]} />
          <stop offset="1" stopColor={p[1]} />
        </radialGradient>
      </defs>
      {corp}
    </svg>
  );
}
