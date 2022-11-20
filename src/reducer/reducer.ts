import {
  CHECK_MATE,
  KILL_PIECE,
  MOVE_PIECE,
  OPEN_MODAL,
  PLAY_AGAIN,
  PROMOTE_PAWN,
  SELECT_PIECE,
} from "../actions/actions";
import { currentState } from "../store/store";

import { reducerType, StorePropType } from "../types/types";

export function reducer(state: StorePropType, action: reducerType) {
  if (action.type === SELECT_PIECE) {
    return {
      ...state,
      selectedPiece: action.payload[0],
      allValidMoves: action.payload[1],
    };
  }
  if (action.type === KILL_PIECE) {
    return { ...state, deadPieces: [...state.deadPieces, action.payload] };
  }
  if (action.type === MOVE_PIECE) {
    return {
      ...state,
      livePieces: action.payload[0],
      current: action.payload[1],
      selectedPiece: null,
      allValidMoves: [],
    };
  }
  if (action.type === PROMOTE_PAWN) {
    return { ...state, livePieces: action.payload, isPawnPromoted: false };
  }
  if (action.type === PLAY_AGAIN) {
    return currentState;
  }
  if (action.type === OPEN_MODAL) {
    return { ...state, isPawnPromoted: true };
  }
  if (action.type === CHECK_MATE) {
    return {
      ...state,
      isCheckmate: true,
      winner: action.payload[0],
      livePieces: action.payload[1],
      allValidMoves: [],
    };
  }

  return state;
}
