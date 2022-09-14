import { ColorType, PiecePropType } from "../../types/types";

export const getPosition = (
  Dir: string[],
  current: string,
  livePieces: PiecePropType[],
  color: ColorType["color"],
  type: "left" | "right" | "bot-right" | "bot-left"
) => {
  const MovesArray = [];
  while (true) {
    const index = Dir.indexOf(current.charAt(0));
    const firstChar = type.includes("bot") ? Dir[index - 1] : Dir[index + 1];
    const secondChar = type.includes("left")
      ? +current.charAt(1) - 1
      : +current.charAt(1) + 1;

    if (type.includes("right") && secondChar > 8) {
      break;
    } else if (type.includes("right") && secondChar < 1) {
      break;
    }
    if (!firstChar) {
      break;
    } else {
      const nextTile = `${firstChar}${secondChar}`;

      const hasPiece = livePieces.find(({ position }) => nextTile === position);

      if (hasPiece) {
        if (hasPiece.color !== color) {
          MovesArray.push(nextTile);
          break;
        } else {
          break;
        }
      }

      MovesArray.push(nextTile);
      current = nextTile;
    }
  }

  return MovesArray;
};
