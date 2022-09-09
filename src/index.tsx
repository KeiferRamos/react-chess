import React from "react";
import ReactDOM from "react-dom/client";
import Globalcontext from "./context/globalcontext";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Globalcontext>
      <App />
    </Globalcontext>
  </React.StrictMode>
);
