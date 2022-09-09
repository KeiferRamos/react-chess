import { useContext, useEffect, useRef } from "react";

import {
  FaChessQueen,
  FaChessRook,
  FaChessKnight,
  FaChessBishop,
} from "react-icons/fa";
import { PROMOTE_PAWN } from "../actions/actions";

import { ContextProvider } from "../context/globalcontext";
import { PiecePropType } from "../types/types";

function Modal() {
  const {
    state: { isPawnPromoted, livePieces, current },
    dispatch,
  } = useContext(ContextProvider);

  const ref = useRef({} as HTMLDivElement);

  useEffect(() => {
    function eventHandler(e: Event) {
      if (
        isPawnPromoted &&
        ref.current &&
        !ref.current.contains(e.target as Node)
      ) {
        ref.current.style.border = "2px solid red";

        setTimeout(() => {
          ref.current.style.border = "none";
        }, 200);
      }
    }

    document.body.addEventListener("mousedown", (e) => eventHandler(e));

    return () =>
      document.body.removeEventListener("mousedown", (e) => eventHandler(e));
  }, []);

  const officials: { icon: JSX.Element; name: PiecePropType["name"] }[] = [
    { icon: <FaChessQueen />, name: "queen" },
    { icon: <FaChessRook />, name: "rook" },
    { icon: <FaChessKnight />, name: "knight" },
    { icon: <FaChessBishop />, name: "bishop" },
  ];

  const promotePawn = (official: PiecePropType["name"]) => {
    const promotionEnd = current === "black" ? "a" : "h";

    const promotedPawn = livePieces.map((piece) => {
      const { position, name } = piece;
      if (position.charAt(0) === promotionEnd && name === "pawn") {
        return { ...piece, name: official };
      }
      return piece;
    });

    dispatch({ type: PROMOTE_PAWN, payload: promotedPawn });
  };

  return (
    <div className="modal-container">
      <div className="modal-content" ref={ref}>
        <h2>Select piece you want to be promoted</h2>
        <ul>
          {officials.map(({ icon, name }, i) => {
            return (
              <li key={i} onClick={() => promotePawn(name)}>
                {icon}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Modal;
