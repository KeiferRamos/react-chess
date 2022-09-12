import { KILL_PIECE, MOVE_PIECE } from "../../actions/actions";
import { MoveType } from "../../types/types";
import { getPosition } from "./getPosition";

export const KingMove = ({
  color,
  position,
  livePieces,
  tileID,
  dispatch,
  selectedPiece,
  opposite,
}: MoveType) => {
  const AllValidMoves = getPosition(color, position, livePieces);

  if (AllValidMoves.includes(tileID)) {
    let updatedPositions = livePieces;

    const hasPiece = livePieces.find(({ position }) => tileID === position);

    if (hasPiece) {
      dispatch({ type: KILL_PIECE, payload: hasPiece });
      updatedPositions = updatedPositions.filter(
        ({ id }) => id !== hasPiece.id
      );
    }

    updatedPositions = updatedPositions.map((piece) => {
      if (piece.id === selectedPiece.id) {
        return { ...piece, position: tileID };
      } else {
        return piece;
      }
    });

    dispatch({ type: MOVE_PIECE, payload: [updatedPositions, opposite] });
  }
};
