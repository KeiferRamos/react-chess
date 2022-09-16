import { Routes, Route } from "react-router-dom";
import Game from "./page/board";
import LoginPage from "./page/login";
import Rooms from "./page/rooms";

function RoutesPage() {
  return (
    <Routes>
      <Route path="/react-chess/:query" element={<LoginPage />} />
      <Route path="/react-chess/game" element={<Game />} />
      <Route path="/react-chess/rooms" element={<Rooms />} />
    </Routes>
  );
}

export default RoutesPage;
