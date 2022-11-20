import { useContext } from "react";
import { PLAY_AGAIN } from "../actions/actions";
import { ContextProvider } from "../context/globalcontext";

function EndGame() {
  const {
    state: { current },
    dispatch,
  } = useContext(ContextProvider);

  return (
    <div className="checkmate">
      <h1>{current} won!</h1>
      <button onClick={() => dispatch({ type: PLAY_AGAIN })}>play again</button>
    </div>
  );
}

export default EndGame;
