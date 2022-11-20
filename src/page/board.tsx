import { useContext, useEffect, useState } from "react";
import Header from "../components/header";
import Board from "../components/board";
import Modal from "../components/modal";
import Promoted from "../components/promoted";
import EndGame from "../components/checkmate";
import { ContextProvider } from "../context/globalcontext";

function Game() {
  const {
    state: { isCheckmate, isPawnPromoted },
  } = useContext(ContextProvider);
  const [invalidID, setInvalidID] = useState(false);
  const [errorMSG, setErrorMSG] = useState("");
  const [winner, setWinner] = useState("");

  if (invalidID) {
    return <div>{errorMSG}</div>;
  } else {
    return (
      <>
        <Header />
        <Board />
        {isPawnPromoted && <Modal children={<Promoted />} />}
        {isCheckmate && <Modal children={<EndGame />} />}
      </>
    );
  }
}

export default Game;
