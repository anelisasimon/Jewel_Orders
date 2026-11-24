import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ComenziPage from "./pages/ComenziPage.jsx";
import ComandaDetaliuPage from "./pages/ComandaDetaliuPage.jsx";
import DesprePage from "./pages/DesprePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// Harta rutelor. Layout înconjoară fiecare pagină.
// Resursa din tw.json este "comenzi", deci detaliul este /comenzi/:id
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ComenziPage />} />
        <Route path="/comenzi/:id" element={<ComandaDetaliuPage />} />
        <Route path="/despre" element={<DesprePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
