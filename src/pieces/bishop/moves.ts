import { KILL_PIECE, MOVE_PIECE } from "../../actions/actions";
import { MoveType } from "../../types/types";
import { getPosition } from "./getPosition";

export const BishopMove = ({
  position,
  color,
  livePieces,
  opposite,
  tileID,
  selectedPiece,
  dispatch,
}: MoveType) => {
  const AllBishopMoves = [];

  const letters = "abcdefgh";

  const Dir =
    color === "white" ? letters.split("").reverse() : letters.split("");

  let current = position;

  let left = getPosition(Dir, current, livePieces, opposite, "left");
  let right = getPosition(Dir, current, livePieces, opposite, "right");
  let BottomRight = getPosition(
    Dir,
    current,
    livePieces,
    opposite,
    "bot-right"
  );
  let BottomLeft = getPosition(Dir, current, livePieces, opposite, "bot-left");

  AllBishopMoves.push(...left, ...right, ...BottomRight, ...BottomLeft);

  if (AllBishopMoves.includes(tileID)) {
    let updatedPieces = livePieces;
    const hasPiece = livePieces.find(({ position }) => position === tileID);

    if (hasPiece) {
      dispatch({ type: KILL_PIECE, payload: hasPiece });
      updatedPieces = updatedPieces.filter(({ position }) => {
        return position !== tileID;
      });
    }

    updatedPieces = updatedPieces.map((piece) => {
      if (piece.id === selectedPiece.id) {
        return { ...piece, position: tileID };
      }
      return piece;
    });

    dispatch({ type: MOVE_PIECE, payload: [updatedPieces, opposite] });

    return AllBishopMoves;
  }
};
