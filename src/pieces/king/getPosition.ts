import { ColorType, PiecePropType } from "../../types/types";

export const getPosition = (
  color: ColorType["color"],
  position: string,
  livePieces: PiecePropType[]
) => {
  const boardLetters = "abcdefgh";

  const Dir =
    color === "black"
      ? boardLetters.split("")
      : boardLetters.split("").reverse();

  let validKingMoves = [];

  //side moves
  validKingMoves.push(`${position.charAt(0)}${+position.charAt(1) - 1}`);

  validKingMoves.push(`${position.charAt(0)}${+position.charAt(1) + 1}`);

  const forwardMove = Dir[Dir.indexOf(position.charAt(0)) + 1];
  const backwardMove = Dir[Dir.indexOf(position.charAt(0)) - 1];

  //forward move
  if (forwardMove) {
    validKingMoves.push(`${forwardMove}${+position.charAt(1) + 1}`);
    validKingMoves.push(`${forwardMove}${+position.charAt(1) - 1}`);
    validKingMoves.push(`${forwardMove}${position.charAt(1)}`);
  }

  //backward move
  if (backwardMove) {
    validKingMoves.push(`${backwardMove}${+position.charAt(1) + 1}`);
    validKingMoves.push(`${backwardMove}${+position.charAt(1) - 1}`);
    validKingMoves.push(`${backwardMove}${position.charAt(1)}`);
  }

  validKingMoves = validKingMoves.filter((moves) => {
    const isSameColor =
      livePieces.find(({ position }) => position === moves)?.color !== color;
    return isSameColor;
  });

  return validKingMoves;
};
