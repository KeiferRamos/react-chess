import { useContext } from "react";
import { socket } from "../index";
import { SET_BOARD } from "../actions/actions";
import { restartGame } from "../api/board";
import { ContextProvider } from "../context/globalcontext";
import pieces from "../pieces/index";

function EndGame() {
  const {
    state: { current, _id },
    dispatch,
  } = useContext(ContextProvider);

  const playAgain = () => {
    restartGame(_id).then(() => {
      socket.emit("restart_game");
      dispatch({ type: SET_BOARD, payload: [pieces, "white", _id] });
    });
  };

  return (
    <div className="checkmate">
      <h1>{current === "black" ? "white" : "black"} won!</h1>
      <button onClick={() => playAgain()}>Play Again</button>
      <button>Exit</button>
    </div>
  );
}

export default EndGame;
