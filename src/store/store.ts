import { StorePropType } from "../types/types";

export const currentState: StorePropType = {
  selectedPiece: null,
  livePieces: [],
  deadPieces: [],
  current: "white",
  isPawnPromoted: false,
  allValidMoves: [],
  isCheckmate: false,
  isUserLoggedIn: false,
  _id: "",
  userSelected: "white",
  winner: "",
};

export const store: StorePropType = currentState;
