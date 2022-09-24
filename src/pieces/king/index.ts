import { MoveType } from "../../types/types";

export const KingMove = ({
  selected: { position, color },
  livePieces,
  Dir,
}: MoveType) => {
  let validKingMoves = [];

  //side moves
  validKingMoves.push(`${position.charAt(0)}${+position.charAt(1) - 1}`);

  validKingMoves.push(`${position.charAt(0)}${+position.charAt(1) + 1}`);

  const forwardMove = Dir[Dir.indexOf(position.charAt(0)) + 1];
  const backwardMove = Dir[Dir.indexOf(position.charAt(0)) - 1];

  //forward move
  validKingMoves.push(`${forwardMove}${+position.charAt(1) + 1}`);
  validKingMoves.push(`${forwardMove}${+position.charAt(1) - 1}`);
  validKingMoves.push(`${forwardMove}${position.charAt(1)}`);

  //backward move

  validKingMoves.push(`${backwardMove}${+position.charAt(1) + 1}`);
  validKingMoves.push(`${backwardMove}${+position.charAt(1) - 1}`);
  validKingMoves.push(`${backwardMove}${position.charAt(1)}`);

  if (color === "white" && position === "h5") {
    const leftRook = livePieces.find(
      ({ position, name }) => position === "h1" && name === "rook"
    );
    if (leftRook) {
      const hasPiece = livePieces.some(({ position }) =>
        ["h2", "h3", "h4"].includes(position)
      );
      if (!hasPiece) {
        validKingMoves.push("h3");
      }
    }
    const rightRook = livePieces.find(
      ({ position, name }) => position === "h8" && name === "rook"
    );
    if (rightRook) {
      const hasPiece = livePieces.some(({ position }) =>
        ["h6", "h7"].includes(position)
      );
      if (!hasPiece) {
        validKingMoves.push("h7");
      }
    }
  }

  if (color === "black" && position === "a5") {
    const leftRook = livePieces.find(
      ({ position, name }) => position === "a1" && name === "rook"
    );
    if (leftRook) {
      const hasPiece = livePieces.some(({ position }) =>
        ["a2", "a3", "a4"].includes(position)
      );
      if (!hasPiece) {
        validKingMoves.push("a3");
      }
    }
    const rightRook = livePieces.find(
      ({ position, name }) => position === "a8" && name === "rook"
    );
    if (rightRook) {
      const hasPiece = livePieces.some(({ position }) =>
        ["a6", "a7"].includes(position)
      );
      if (!hasPiece) {
        validKingMoves.push("a7");
      }
    }
  }

  validKingMoves = validKingMoves.filter((moves) => {
    const isSameColor =
      livePieces.find(({ position }) => position === moves)?.color !== color;
    return isSameColor;
  });

  return validKingMoves;
};
