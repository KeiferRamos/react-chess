import pieces from "../pieces";
import { StorePropType } from "../types/types";

export const currentState: StorePropType = {
  selectedPiece: null,
  livePieces: pieces,
  deadPieces: [],
  current: "white",
  isPawnPromoted: false,
  allValidMoves: [],
  isCheckmate: false,
};

export const store: StorePropType = currentState;
