import { Routes, Route, Navigate } from "react-router-dom";
import Game from "./page/board";
import LoginPage from "./page/login";
import Rooms from "./page/rooms";

function RoutesPage() {
  return (
    <Routes>
      <Route
        path="/#/react-chess"
        element={<Navigate to="/react-chess/login" />}
      />
      <Route path="/#/react-chess/:query" element={<LoginPage />} />
      <Route path="/#/react-chess/game/:_id" element={<Game />} />
      <Route path="/#/react-chess/rooms" element={<Rooms />} />
      <Route path="*" element={<Navigate to="/react-chess/login" />} />
    </Routes>
  );
}

export default RoutesPage;
