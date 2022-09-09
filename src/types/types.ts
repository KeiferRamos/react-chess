export type PiecePropType = {
  id: number;
  name: "pawn" | "rook" | "bishop" | "knight" | "king" | "queen";
  color: "white" | "black";
  position: string;
  isOut: boolean;
};

export type StorePropType = {
  selectedPiece: PiecePropType | null;
  livePieces: PiecePropType[];
  current: "white" | "black";
  isPawnPromoted: Boolean;
};

type MoveActionType = {
  type: "MOVE_PIECE";
  payload: [PiecePropType[], "white" | "black"];
};

type SelectActionType = {
  type: "SELECT_PIECE";
  payload: PiecePropType | null;
};

type ModalType = {
  type: "CLOSE_MODAL" | "OPEN_MODAL";
  payload?: never;
};

type PromotePawnType = {
  type: "PROMOTE_PAWN";
  payload: PiecePropType[];
};

export type reducerType =
  | MoveActionType
  | SelectActionType
  | ModalType
  | PromotePawnType;

export type moveHandlerType = {
  selectedPiece: PiecePropType | null;
  ValidMoves: Boolean[];
  tileID: string;
  dispatch: (value: reducerType) => void;
  opposite: "white" | "black";
};
