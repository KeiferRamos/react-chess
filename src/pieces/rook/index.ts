import { MoveType } from "../../types/types";
import { getPosition } from "./moves";
import { directionType } from "../../types/types";

export const RookMove = ({ selected, livePieces, Dir }: MoveType) => {
  const validMoves: string[] = [];

  const AllDirections = ["left", "right", "bot", "top"];

  let current = selected.position;
  AllDirections.forEach((el) => {
    const move = getPosition(
      selected,
      el as directionType["type"],
      livePieces,
      Dir,
      current
    );
    validMoves.push(...move);
  });

  return validMoves;
};
