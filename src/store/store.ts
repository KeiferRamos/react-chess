import { StorePropType } from "../types/types";
import Pieces from "../pieces/index";

export const currentState: StorePropType = {
  selectedPiece: null,
  livePieces: Pieces,
  deadPieces: [],
  current: "white",
  isPawnPromoted: false,
  allValidMoves: [],
  isCheckmate: false,
  isUserLoggedIn: false,
};

export const store: StorePropType = currentState;
