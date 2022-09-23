import ReactDOM from "react-dom/client";
import Globalcontext from "./context/globalcontext";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

export const socket = io("https://react-chess-server.herokuapp.com");

axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Globalcontext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Globalcontext>
);
