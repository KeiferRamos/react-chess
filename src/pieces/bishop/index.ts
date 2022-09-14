import { MoveType } from "../../types/types";
import { getPosition } from "./moves";

export type Alldirection = {
  type: "left" | "right" | "bot-right" | "bot-left";
};

export const BishopMove = ({
  selected: { position, color },
  livePieces,
  Dir,
}: MoveType) => {
  const AllBishopMoves: string[] = [];

  const directions = ["left", "right", "bot-right", "bot-left"];

  let current = position;

  directions.forEach((dir) => {
    const moves = getPosition(
      Dir,
      current,
      livePieces,
      color,
      dir as Alldirection["type"]
    );
    AllBishopMoves.push(...moves);
  });

  return AllBishopMoves;
};
