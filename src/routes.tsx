import { Routes, Route } from "react-router-dom";
import Game from "./page/board";
import LoginPage from "./page/login";

function RoutesPage() {
  return (
    <Routes>
      <Route path="/react-chess/:query" element={<LoginPage />} />
      <Route path="/react-chess/Game" element={<Game />} />
    </Routes>
  );
}

export default RoutesPage;
