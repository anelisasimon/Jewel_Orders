// Toate cererile HTTP stau aici; componentele nu apelează fetch direct.
// Resursa temei proprii: "comenzi" (cheia din db.json)
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export async function fetchComenzi() {
  const res = await fetch(`${API_URL}/comenzi`);
  if (!res.ok) {
    throw new Error(`Eroare server: ${res.status}`);
  }
  return res.json();
}
