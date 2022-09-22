import { useContext } from "react";

import {
  FaChessQueen,
  FaChessRook,
  FaChessKnight,
  FaChessBishop,
} from "react-icons/fa";

import { PROMOTE_PAWN } from "../actions/actions";
import { ContextProvider } from "../context/globalcontext";
import { PiecePropType } from "../types/types";
import { updatePieces } from "../api/board";
import { socket } from "../index";

function Promoted() {
  const {
    state: { livePieces, current, deadPieces, _id },
    dispatch,
  } = useContext(ContextProvider);

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
    updatePieces(promotedPawn, deadPieces, current, _id).then(() => {
      socket.emit("update_board", { _id });
    });
  };

  return (
    <>
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
    </>
  );
}

export default Promoted;
