import {
  CLOSE_MODAL,
  MOVE_PIECE,
  OPEN_MODAL,
  PROMOTE_PAWN,
  SELECT_PIECE,
} from "../actions/actions";

import { reducerType, StorePropType } from "../types/types";

export function reducer(state: StorePropType, action: reducerType) {
  if (action.type === SELECT_PIECE) {
    return { ...state, selectedPiece: action.payload };
  }
  if (action.type === MOVE_PIECE) {
    return {
      ...state,
      livePieces: action.payload[0],
      current: action.payload[1],
      selectedPiece: null,
    };
  }
  if (action.type === PROMOTE_PAWN) {
    return { ...state, livePieces: action.payload, isPawnPromoted: false };
  }
  if (action.type === CLOSE_MODAL) {
    return { ...state, isPawnPromoted: false };
  }
  if (action.type === OPEN_MODAL) {
    return { ...state, isPawnPromoted: true };
  }

  return state;
}