import { PiecePropType } from "../types/types";

export const updateBoard = (
  livePieces: PiecePropType[],
  move: string,
  selected: PiecePropType
) => {
  let newPieces = livePieces.filter(({ position }) => position !== move);

  newPieces = newPieces.map((piece) => {
    if (piece.id === selected.id) {
      return { ...piece, position: move };
    }
    return piece;
  });

  return newPieces;
};
