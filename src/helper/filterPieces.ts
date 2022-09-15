import { PiecePropType } from "../types/types";

export const filterPieces = (
  livePieces: PiecePropType[],
  selected: PiecePropType
) => {
  return livePieces.filter(({ color }) => color !== selected.color);
};
