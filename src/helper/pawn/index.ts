import { MOVE_PIECE, OPEN_MODAL } from "../../actions/actions";
import getposition from "./getposition";
import attack from "./attack";
import { MoveType } from "../../types/types";

export default ({
  selectedPiece,
  livePieces,
  tileID,
  ValidMoves,
  position,
  dispatch,
  tileContent,
  opposite,
}: Omit<MoveType, "color">) => {
  let pieceDirection;
  const verticalDirection = "abcdefgh";

  if (selectedPiece.color === "white") {
    pieceDirection = verticalDirection.split("").reverse();
  } else {
    pieceDirection = verticalDirection.split("");
  }

  if (ValidMoves[1]) {
    const rightDirection = [
      getposition(pieceDirection, position, 1),
      getposition(pieceDirection, position, 2),
    ];

    if (pieceDirection.indexOf(position.charAt(0)) > 1) {
      rightDirection.pop();
    }

    if (rightDirection.includes(tileID)) {
      const updatedPiecesPositions = livePieces.map((piece) => {
        if (piece.id === selectedPiece.id) {
          return { ...piece, position: tileID };
        } else {
          return piece;
        }
      });

      dispatch({
        type: MOVE_PIECE,
        payload: [updatedPiecesPositions, opposite],
      });
    }
  } else if (ValidMoves[0]) {
    const validAttack = [
      attack(pieceDirection, position, "+1"),
      attack(pieceDirection, position, "-1"),
    ];

    if (validAttack.includes(tileContent!.position)) {
      const updatedPiecesPositions = livePieces
        .filter(({ position }) => tileID !== position)
        .map((piece) => {
          if (piece.id === selectedPiece.id) {
            return { ...piece, position: tileID };
          } else {
            return piece;
          }
        });

      if (
        position.charAt(0) === pieceDirection[pieceDirection.length - 2] &&
        tileID.charAt(0) === pieceDirection[pieceDirection.length - 1]
      ) {
        dispatch({ type: OPEN_MODAL });
      }

      dispatch({
        type: MOVE_PIECE,
        payload: [updatedPiecesPositions, opposite],
      });
    }
  }
};
