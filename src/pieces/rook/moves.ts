import { checkTile } from "../../helper/checkTile";
import { PiecePropType } from "../../types/types";

export const getPosition = (
  { color }: PiecePropType,
  type: "left" | "right" | "bot" | "top",
  livePieces: PiecePropType[],
  dir: string[],
  current: string
) => {
  const validMoves = [];

  while (true) {
    if (["right", "left"].includes(type)) {
      const secondChar = type === "right" ? +current[1] + 1 : +current[1] - 1;

      let isEnd = false;

      if (type === "right" && secondChar > 8) {
        isEnd = true;
      } else if (type === "left" && secondChar < 1) {
        isEnd = true;
      }

      if (!isEnd) {
        const nextTile = `${current[0]}${secondChar}`;
        const hasPiece = checkTile(livePieces, nextTile);
        if (!hasPiece) {
          validMoves.push(nextTile);
          current = nextTile;
        } else if (hasPiece && hasPiece.color !== color) {
          validMoves.push(nextTile);
          break;
        } else {
          break;
        }
      } else {
        break;
      }
    } else {
      const firstChar = current[0];
      const index =
        type === "top"
          ? dir.indexOf(firstChar) + 1
          : dir.indexOf(firstChar) - 1;

      let isEnd = false;

      if (type === "top" && index >= dir.length) {
        isEnd = true;
      } else if (type === "bot" && index < 0) {
        isEnd = true;
      }

      if (!isEnd) {
        const nextTile = `${dir[index]}${current[1]}`;
        const hasPiece = checkTile(livePieces, nextTile);
        if (!hasPiece) {
          validMoves.push(nextTile);
          current = nextTile;
        } else if (hasPiece && hasPiece.color !== color) {
          validMoves.push(nextTile);
          break;
        } else {
          break;
        }
      } else {
        break;
      }
    }
  }

  return validMoves;
};
