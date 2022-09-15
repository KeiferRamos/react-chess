import { getDirection } from "../helper/direction";
import { SelectFunctionType } from "../types/types";
import { checkTile } from "../helper/checkTile";
import getOpponent from "./opponent";
import { createTable } from "../helper/createTable";
import { updateBoard } from "../helper/update";
import { filterPieces } from "../helper/filterPieces";

export default ({ selected, allMoves, livePieces }: SelectFunctionType) => {
  const currentSelected = selected.name as keyof typeof allMoves;
  const directions = getDirection(selected.color);

  let validMoves: string[] = allMoves[currentSelected]({
    livePieces,
    selected,
    Dir: directions,
  });

  const opponentPieces = filterPieces(livePieces, selected);

  const currentKing = livePieces.find(
    ({ name, color }) => name === "king" && color === selected.color
  )!;

  let isKingThreatened = false;

  const opponent = getOpponent(opponentPieces, allMoves, livePieces);

  if (opponent[0].includes(currentKing.position)) {
    isKingThreatened = true;
  }

  if (isKingThreatened) {
    if (selected.name === "king") {
      const hasPieceInRight = checkTile(livePieces, validMoves[2]);

      if (hasPieceInRight && hasPieceInRight.name === "pawn") {
        validMoves[1] = "xx";
      }
      const hasPieceInLeft = checkTile(livePieces, validMoves[3]);
      if (hasPieceInLeft && hasPieceInLeft.name === "pawn") {
        validMoves[0] = "xx";
      }
      validMoves = validMoves.filter((move) => !opponent[0].includes(move));

      const table = createTable();
      const allMovesInBoard: string[] = [];
      table.forEach((row) => {
        allMovesInBoard.push(...row);
      });

      validMoves = validMoves.filter((move) => allMovesInBoard.includes(move));

      validMoves.forEach((move, i) => {
        let newPieces = livePieces.filter(({ position }) => position !== move);
        newPieces = newPieces.map((piece) => {
          if (
            currentKing.name === piece.name &&
            piece.color === selected.color
          ) {
            return { ...piece, position: move };
          } else {
            return piece;
          }
        });

        const opponentPieces = newPieces.filter(
          ({ color }) => color !== selected.color
        );

        const nextValidMoves = getOpponent(opponentPieces, allMoves, newPieces);

        if (nextValidMoves[0].includes(move)) {
          validMoves[i] = "xx";
        }
      });
    } else {
      let isKillable = false;
      const checkKill = validMoves.find((move) => opponent[1].includes(move));

      if (checkKill && opponent[1].length <= 1) {
        isKillable = true;
      }

      const isInMoves = validMoves.filter((piece) =>
        opponent[0].includes(piece)
      );

      if (isInMoves.length > 0) {
        const newValidMoves: string[] = [];
        isInMoves.forEach((move) => {
          let newPieces = updateBoard(livePieces, move, selected);

          const filtered = filterPieces(newPieces, selected);

          const newOpponent = getOpponent(filtered, allMoves, newPieces);

          if (newOpponent[0].includes(currentKing.position)) {
            return;
          } else {
            newValidMoves.push(move);
          }
        });
        validMoves = newValidMoves;
      } else {
        validMoves = [];
      }
      if (isKillable) {
        validMoves.push(opponent[1][0]);
      }
    }
  } else {
    for (var i = 0; i < validMoves.length; i++) {
      const update = updateBoard(livePieces, validMoves[i], selected);

      const filtered = filterPieces(update, selected);

      const newOpponent = getOpponent(filtered, allMoves, update);
      if (newOpponent[1].length > 0) {
        validMoves[i] = "xxx";
      }
    }
  }

  return validMoves;
};
