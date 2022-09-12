export type ColorType = {
  color: "white" | "black";
};

export type PiecePropType = {
  id: number;
  name: "pawn" | "rook" | "bishop" | "knight" | "king" | "queen";
  color: ColorType["color"];
  position: string;
  isOut: boolean;
};

export type StorePropType = {
  selectedPiece: PiecePropType | null;
  livePieces: PiecePropType[];
  deadPieces: PiecePropType[];
  current: ColorType["color"];
  isPawnPromoted: Boolean;
};

type MoveActionType = {
  type: "MOVE_PIECE";
  payload: [PiecePropType[], ColorType["color"]];
};

type SelectActionType = {
  type: "SELECT_PIECE" | "KILL_PIECE";
  payload: PiecePropType;
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
  opposite: ColorType["color"];
};

export type MoveType = {
  position: string;
  color: ColorType["color"];
  livePieces: PiecePropType[];
  tileID: string;
  dispatch: (value: reducerType) => void;
  selectedPiece: PiecePropType;
  opposite: ColorType["color"];
  tileContent: PiecePropType | null;
  ValidMoves: Boolean[];
};
