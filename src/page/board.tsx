import { useContext, useEffect } from "react";
import Header from "../components/header";
import Board from "../components/board";
import Modal from "../components/modal";
import Promoted from "../components/promoted";
import EndGame from "../components/checkmate";
import { ContextProvider } from "../context/globalcontext";
import { CANCEL_BACK, TURN_BACK } from "../actions/actions";
import RemoveRoom from "../components/removeRoom";
import { useNavigate } from "react-router";

function Game() {
  const {
    state: { isCheckmate, isPawnPromoted, isTurningBack },
    dispatch,
  } = useContext(ContextProvider);
  const nav = useNavigate();

  useEffect(() => {
    function eventHandler() {
      nav(1);
      dispatch({ type: TURN_BACK });
    }

    window.addEventListener("popstate", () => eventHandler());

    return () => window.removeEventListener("popstate", () => eventHandler());
  }, []);

  useEffect(() => {
    dispatch({ type: CANCEL_BACK });
  }, []);

  useEffect(() => {
    const room = localStorage.getItem("room");
    if (!room) {
      nav("/react-chess/rooms");
    }
  }, []);

  return (
    <>
      <Header />
      <Board />
      {isTurningBack && <Modal children={<RemoveRoom />} />}
      {isPawnPromoted && <Modal children={<Promoted />} />}
      {isCheckmate && <Modal children={<EndGame />} />}
    </>
  );
}

export default Game;
