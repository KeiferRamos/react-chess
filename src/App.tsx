import Board from "./components/board";
import "./App.css";
import Modal from "./components/modal";
import { useContext } from "react";
import { ContextProvider } from "./context/globalcontext";
import Header from "./components/header";
import Promoted from "./components/promoted";
import EndGame from "./components/checkmate";

function App() {
  const {
    state: { isPawnPromoted, isCheckmate },
  } = useContext(ContextProvider);

  return (
    <div className="App">
      <Header />
      <Board />
      {isPawnPromoted && <Modal children={<Promoted />} />}
      {isCheckmate && <Modal children={<EndGame />} />}
    </div>
  );
}

export default App;
