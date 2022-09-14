import { PiecePropType } from "../types/types";

export const checkTile = (livePieces: PiecePropType[], move: string) => {
  const hasPiece = livePieces.find(({ position }) => position === move);
  return hasPiece;
};
