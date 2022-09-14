import { ColorType, PiecePropType } from "../types/types";

export const validateMove = (
  livePieces: PiecePropType[],
  move: string,
  color: ColorType["color"]
) => {
  const hasPiece = livePieces.find(({ position }) => position === move);

  if (!hasPiece || (hasPiece && hasPiece.color !== color)) {
    return move;
  }
};
