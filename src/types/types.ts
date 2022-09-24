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
  isCheckmate: boolean;
  isUserLoggedIn: boolean;
  _id: string | undefined;
  userSelected: ColorType["color"];
  winner: ColorType["color"] | "";
};

export type directionType = {
  type: "top" | "bot" | "left" | "right";
};

type SetActionType = {
  type: "SET_BOARD";
  payload: [PiecePropType[], ColorType["color"], string | undefined];
};

export type UpdatePayloadType = {
  livePieces: PiecePropType[];
  deadPieces: PiecePropType[];
  current: ColorType["color"];
};

type UpdateActionType = {
  type: "UPDATE_BOARD";
  payload: UpdatePayloadType;
};

type SelectColorActionType = {
  type: "SET_SELECTED";
  payload: ColorType["color"];
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

type CheckMateActionType = {
  type: "CHECK_MATE";
  payload: ColorType["color"];
};

type ModalType = {
  type: "CLOSE_MODAL" | "OPEN_MODAL" | "PLAY_AGAIN";
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
  | KillActionType
  | SetActionType
  | UpdateActionType
  | SelectColorActionType
  | CheckMateActionType;

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
};

export type MoveFunctionType = {
  livePieces: PiecePropType[];
  tileID: string;
  selectedPiece: PiecePropType;
  dispatch: (value: reducerType) => void;
  allMoves: any;
};

export type UserInputType = {
  username: string;
  password: string;
  confirm?: string;
};

export type CreateInputType = {
  name: string;
  password: string;
};

export type PasswordInputType = {
  password: string;
};

export type InputType = {
  inputs: UserInputType | CreateInputType | string;
  item: string;
  updateInputs: (e: React.ChangeEvent, item: string) => void;
};

export type MessageType = {
  message: string;
  success: boolean;
  user?: { username: string; password: string };
};

export type LoginQueryType = {
  query: "login" | "register";
};

export type joinRoomType = {
  name: string;
  password: string;
  selected: string;
};

export type RoomType = {
  name: string;
  password: string;
  creator: string;
  _id: string;
  players: { selected: ColorType["color"]; username: string }[];
  game: { livePieces: PiecePropType[]; deadPieces: PiecePropType[] };
};
