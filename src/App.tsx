import Board from "./components/board";
import "./App.css";
import Modal from "./components/modal";
import { useContext, useEffect } from "react";
import { ContextProvider } from "./context/globalcontext";
import Header from "./components/header";

function App() {
  const {
    state: { isPawnPromoted, deadPieces },
  } = useContext(ContextProvider);

  useEffect(() => {
    console.log(deadPieces);
  }, [deadPieces]);

  return (
    <div className="App">
      <Header />
      <Board />
      {isPawnPromoted && <Modal />}
    </div>
  );
}

export default App;
