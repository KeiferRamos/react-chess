import React from "react";
import ReactDOM from "react-dom/client";
import Globalcontext from "./context/globalcontext";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Globalcontext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Globalcontext>
  </React.StrictMode>
);
