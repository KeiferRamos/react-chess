import React, { useContext } from "react";
import { ContextProvider } from "../context/globalcontext";

function Header() {
  const {
    state: { current, isCheckmate },
  } = useContext(ContextProvider);

  return (
    <header>
      <h1 style={{ textAlign: "center", marginBottom: "10px", color: "white" }}>
        {isCheckmate ? "CHECKMATE!" : `${current.toUpperCase()} TURN!`}
      </h1>
    </header>
  );
}

export default Header;
