const ICOANE = {
  inel: (
    <>
      <circle cx="12" cy="15.5" r="6" />
      <path d="M9 6.5 10.6 3.8h2.8L15 6.5l-3 3.6z" />
      <path d="M9 6.5h6" />
    </>
  ),
  bratara: (
    <>
      <ellipse cx="12" cy="9" rx="8.5" ry="3.6" />
      <path d="M3.5 9v5.4c0 2 3.8 3.6 8.5 3.6s8.5-1.6 8.5-3.6V9" />
      <circle cx="8" cy="18.4" r=".9" />
      <circle cx="12" cy="19.2" r=".9" />
      <circle cx="16" cy="18.4" r=".9" />
    </>
  ),
  colier: (
    <>
      <path d="M3.5 4c0 7.5 3.2 11 8.5 11s8.5-3.5 8.5-11" />
      <path d="M12 15v1.2" />
      <path d="M12 21.2 9.3 18.3a1.7 1.7 0 0 1 2.7-2.1 1.7 1.7 0 0 1 2.7 2.1z" />
    </>
  ),
  cercei: (
    <>
      <g>
        <circle cx="7" cy="3.8" r="1.1" />
        <path d="M7 5v3" />
        <path d="M7 8 4.6 11.6a2.9 2.9 0 1 0 4.8 0z" />
      </g>
      <g transform="translate(10 0)">
        <circle cx="7" cy="3.8" r="1.1" />
        <path d="M7 5v3" />
        <path d="M7 8 4.6 11.6a2.9 2.9 0 1 0 4.8 0z" />
      </g>
    </>
  ),
};

export default function JewelIcon({ tip }) {
  return (
    <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICOANE[tip] || ICOANE.inel}
    </svg>
  );
}
