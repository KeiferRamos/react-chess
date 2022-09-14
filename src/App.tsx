import Board from "./components/board";
import "./App.css";
import Modal from "./components/modal";
import { useContext } from "react";
import { ContextProvider } from "./context/globalcontext";
import Header from "./components/header";

function App() {
  const {
    state: { isPawnPromoted },
  } = useContext(ContextProvider);

  return (
    <div className="App">
      <Header />
      <Board />
      {isPawnPromoted && <Modal />}
    </div>
  );
}

export default App;
