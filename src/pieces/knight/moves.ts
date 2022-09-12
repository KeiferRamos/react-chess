import { KILL_PIECE, MOVE_PIECE } from "../../actions/actions";
import { MoveType } from "../../types/types";
import { getHorPosition } from "./leftAndRight";
import { getVerPosition } from "./topAndBottom";

export const KnightMove = ({
  color,
  position,
  livePieces,
  selectedPiece,
  tileID,
  dispatch,
  opposite,
}: MoveType) => {
  let validMoves: string[] = [];
  const letters = "abcdefgh";
  const pieceDir =
    color === "white" ? letters.split("").reverse() : letters.split("");

  const left = getHorPosition(position, pieceDir, "left");
  const right = getHorPosition(position, pieceDir, "right");
  const bot = getVerPosition(position, pieceDir, "bot");
  const top = getVerPosition(position, pieceDir, "top");

  validMoves.push(...left, ...right, ...bot, ...top);

  if (validMoves.includes(tileID)) {
    let updatedPieces = livePieces;
    const hasPiece = livePieces.find(({ position }) => position === tileID);

    if (hasPiece) {
      dispatch({ type: KILL_PIECE, payload: hasPiece });
      updatedPieces = updatedPieces.filter(
        ({ position }) => position !== tileID
      );
    }

    updatedPieces = updatedPieces.map((piece) => {
      if (piece.id === selectedPiece.id) {
        return { ...piece, position: tileID };
      } else {
        return piece;
      }
    });

    dispatch({ type: MOVE_PIECE, payload: [updatedPieces, opposite] });
  }
};
