import { createTable } from "../helper/createTable";
import {
  OPEN_MODAL,
  CHECK_MATE,
  MOVE_PIECE,
  KILL_PIECE,
} from "../actions/actions";
import select from "./select";
import { MoveFunctionType } from "../types/types";
import { getDirection } from "../helper/direction";

export const movePiece = ({
  livePieces,
  tileID,
  selectedPiece,
  dispatch,
  allMoves,
}: MoveFunctionType) => {
  const hasPiece = livePieces.find(({ position }) => position === tileID);

  const opposite = selectedPiece.color === "white" ? "black" : "white";

  const direction = getDirection(selectedPiece.color);
  if (selectedPiece.name === "pawn") {
    if (direction.indexOf(tileID.charAt(0)) === direction.length - 1) {
      dispatch({ type: OPEN_MODAL });
    }
  }

  let update = livePieces;

  if (hasPiece) {
    update = update.filter(({ position }) => hasPiece.position !== position);
    dispatch({ type: KILL_PIECE, payload: hasPiece });
  }

  update = update.map((piece) => {
    if (piece.id === selectedPiece.id) {
      return { ...piece, position: tileID };
    } else {
      return piece;
    }
  });

  const opponent = livePieces.filter(
    ({ color }) => color !== selectedPiece.color
  );

  const opponentTurn: string[] = [];
  opponent.forEach((piece) => {
    const validMoves = select({
      selected: piece,
      allMoves,
      livePieces: update,
    });
    opponentTurn.push(...validMoves);
  });

  const table = createTable();
  const allMovesInBoard: string[] = [];
  table.forEach((row) => {
    allMovesInBoard.push(...row);
  });

  const isInBoard = opponentTurn.filter((move) =>
    allMovesInBoard.includes(move)
  );

  dispatch({ type: MOVE_PIECE, payload: [update, opposite] });

  if (isInBoard.length <= 0) {
    dispatch({ type: CHECK_MATE });
  }
};
