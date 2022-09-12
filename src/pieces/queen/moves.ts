import { MoveType } from "../../types/types";
import { BishopMove } from "../bishop/moves";
import { RookMove } from "../rook";

export const QueenMove = (args: MoveType) => {
  RookMove(args);
  BishopMove(args);
};
