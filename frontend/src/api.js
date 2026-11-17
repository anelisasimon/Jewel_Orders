// Toate cererile HTTP stau aici; componentele nu apelează fetch direct.
// Resursa temei proprii: "comenzi" (cheia din db.json)
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

// Funcție comună: trimite JSON și aruncă eroare dacă răspunsul nu este 2xx
async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  if (!res.ok) {
    throw new Error(`Eroare server: ${res.status}`);
  }
  // 204 No Content nu are corp
  return res.status === 204 ? null : res.json();
}

export function fetchComenzi() {
  return request("/comenzi");
}

export function createComanda(comanda) {
  return request("/comenzi", { method: "POST", body: JSON.stringify(comanda) });
}

export function updateComanda(id, changes) {
  return request(`/comenzi/${id}`, {
    method: "PATCH",
    body: JSON.stringify(changes),
  });
}

export function deleteComanda(id) {
  return request(`/comenzi/${id}`, { method: "DELETE" });
}
