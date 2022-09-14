import { validateMove } from "../../helper/validate";
import { PiecePropType } from "../../types/types";

export const getPosition = (
  { position, color }: PiecePropType,
  pieceDir: string[],
  type: "top" | "bot" | "left" | "right",
  livePieces: PiecePropType[]
) => {
  const moves = [];

  if (["bot", "top"].includes(type)) {
    const index = pieceDir.indexOf(position.charAt(0));
    const topOrBot = pieceDir[type === "top" ? index + 2 : index - 2];

    if (topOrBot) {
      const left = +position.charAt(1) > 1;
      const right = +position.charAt(1) < 8;

      if (left) {
        const move = `${topOrBot}${+position.charAt(1) - 1}`;

        const validMove = validateMove(livePieces, move, color);
        if (validMove) {
          moves.push(validMove);
        }
      }
      if (right) {
        const move = `${topOrBot}${+position.charAt(1) + 1}`;
        const validMove = validateMove(livePieces, move, color);

        if (validMove) {
          moves.push(validMove);
        }
      }
    }
  } else {
    const MoveDir =
      type === "left" ? +position.charAt(1) > 2 : +position.charAt(1) < 7;

    const pieceIndex = pieceDir.indexOf(position.charAt(0));

    const bot = pieceDir[pieceIndex - 1];
    const top = pieceDir[pieceIndex + 1];

    if (MoveDir) {
      const dir =
        type === "left" ? +position.charAt(1) - 2 : +position.charAt(1) + 2;

      if (bot) {
        const botMove = `${bot}${dir}`;

        const validMove = validateMove(livePieces, botMove, color);
        if (validMove) {
          moves.push(validMove);
        }
      }
      if (top) {
        const topMove = `${top}${dir}`;
        const validMove = validateMove(livePieces, topMove, color);
        if (validMove) {
          moves.push(validMove);
        }
      }
    }
  }

  return moves;
};
