import { useContext, useEffect, useState } from "react";
import { socket } from "../index";
import { SET_BOARD } from "../actions/actions";
import { restartGame } from "../api/board";
import { ContextProvider } from "../context/globalcontext";
import pieces from "../pieces/index";

function EndGame() {
  const {
    state: { _id, userSelected, winner },
    dispatch,
  } = useContext(ContextProvider);
  const [win, setwin] = useState("");

  const playAgain = () => {
    restartGame(_id).then(() => {
      socket.emit("restart_game");
      dispatch({ type: SET_BOARD, payload: [pieces, "white", _id] });
    });
  };

  useEffect(() => {
    setwin(winner);
  }, []);

  return (
    <div className="checkmate">
      <h1>you {userSelected === win ? "won!" : "lose!"}</h1>
      <button onClick={() => playAgain()}>play again</button>
      <button>Exit</button>
    </div>
  );
}

export default EndGame;
