import { OPEN_MODAL, KILL_PIECE } from "../actions/actions";
import { MoveFunctionType } from "../types/types";
import { getDirection } from "../helper/direction";
import { PiecePropType } from "../types/types";
import { socket } from "../index";

export const movePiece = ({
  livePieces,
  tileID,
  selectedPiece,
  dispatch,
  _id,
}: MoveFunctionType): {
  update: PiecePropType[];
  opposite: "white" | "black";
} => {
  const hasPiece = livePieces.find(({ position }) => position === tileID);

  const opposite = selectedPiece.color === "white" ? "black" : "white";

  const direction = getDirection(selectedPiece.color);
  if (selectedPiece.name === "pawn") {
    if (direction.indexOf(tileID.charAt(0)) === direction.length - 1) {
      dispatch({ type: OPEN_MODAL });
    }
  }
  if (selectedPiece.name === "king") {
    socket.emit("king_move", { color: selectedPiece.color, _id });
  }

  const castling: [boolean, string] = [false, ""];

  const { name, position, color } = selectedPiece;
  if (name === "king" && position === "h5" && color === "white") {
    if (tileID === "h3" || tileID === "h7") {
      castling[0] = true;
      castling[1] = tileID;
    }
  }

  if (name === "king" && position === "a5" && color === "black") {
    if (tileID === "a3" || tileID === "a7") {
      castling[0] = true;
      castling[1] = tileID;
    }
  }

  let update = livePieces;

  if (hasPiece) {
    update = update.filter(({ position }) => hasPiece.position !== position);
    dispatch({ type: KILL_PIECE, payload: hasPiece });
  }

  update = update.map((piece) => {
    if (castling[0]) {
      if (castling[1] === "h3") {
        if (piece.name === "king" && piece.color === "white") {
          return { ...piece, position: "h3" };
        }
        if (
          piece.name === "rook" &&
          piece.color === "white" &&
          piece.position === "h1"
        ) {
          return { ...piece, position: "h4" };
        }
      }
      if (castling[1] === "h7") {
        if (piece.name === "king" && piece.color === "white") {
          return { ...piece, position: "h7" };
        }
        if (
          piece.name === "rook" &&
          piece.color === "white" &&
          piece.position === "h8"
        ) {
          return { ...piece, position: "h6" };
        }
      }
      if (castling[1] === "a3") {
        if (piece.name === "king" && piece.color === "black") {
          return { ...piece, position: "a3" };
        }
        if (
          piece.name === "rook" &&
          piece.color === "black" &&
          piece.position === "a1"
        ) {
          return { ...piece, position: "a4" };
        }
      }
      if (castling[1] === "a7") {
        if (piece.name === "king" && piece.color === "black") {
          return { ...piece, position: "a7" };
        }
        if (
          piece.name === "rook" &&
          piece.color === "black" &&
          piece.position === "a8"
        ) {
          return { ...piece, position: "a6" };
        }
      }
    } else {
      if (piece.id === selectedPiece.id) {
        return { ...piece, position: tileID };
      }
    }
    return piece;
  });

  return { update, opposite };
};
