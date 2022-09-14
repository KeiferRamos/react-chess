import { MoveType, PiecePropType } from "../../types/types";
import { getPosition } from "./moves";
import { directionType } from "../../types/types";

export const KnightMove = ({ selected, Dir, livePieces }: MoveType) => {
  let validMoves: string[] = [];

  const AllDirections = ["left", "right", "bot", "top"];

  AllDirections.forEach((dir) => {
    const move = getPosition(
      selected,
      Dir,
      dir as directionType["type"],
      livePieces
    );
    validMoves.push(...move);
  });

  return validMoves;
};
