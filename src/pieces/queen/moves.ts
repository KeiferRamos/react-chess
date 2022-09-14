import { MoveType } from "../../types/types";
import { BishopMove } from "../bishop";
import { RookMove } from "../rook";

export const QueenMove = (args: MoveType): string[] => {
  const rook = RookMove(args);
  const bishop = BishopMove(args);
  return [...rook, ...bishop];
};
