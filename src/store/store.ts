import { StorePropType } from "../types/types";
import Pieces from "../pieces/index";

export const store: StorePropType = {
  selectedPiece: null,
  livePieces: Pieces,
  current: "white",
  isPawnPromoted: false,
};