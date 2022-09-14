import { StorePropType } from "../types/types";
import Pieces from "../pieces/index";

export const store: StorePropType = {
  selectedPiece: null,
  livePieces: Pieces,
  deadPieces: [],
  current: "white",
  isPawnPromoted: false,
  allValidMoves: [],
};
