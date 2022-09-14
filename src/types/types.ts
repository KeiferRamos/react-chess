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
  allValidMoves: string[];
};

export type directionType = {
  type: "top" | "bot" | "left" | "right";
};

type MoveActionType = {
  type: "MOVE_PIECE";
  payload: [PiecePropType[], ColorType["color"]];
};

type SelectActionType = {
  type: "SELECT_PIECE";
  payload: [PiecePropType, string[]];
};

type KillActionType = {
  type: "KILL_PIECE";
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
  | PromotePawnType
  | KillActionType;

export type moveHandlerType = {
  selectedPiece: PiecePropType | null;
  ValidMoves: Boolean[];
  tileID: string;
  dispatch: (value: reducerType) => void;
  opposite: ColorType["color"];
};

export type MoveType = {
  livePieces: PiecePropType[];
  selected: PiecePropType;
  Dir: string[];
};

export type SelectFunctionType = {
  selected: PiecePropType;
  allMoves: any;
  livePieces: PiecePropType[];
  dispatch: (value: reducerType) => void;
};
