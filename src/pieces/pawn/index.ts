import getposition from "./getposition";
import attack from "./attack";
import { MoveType } from "../../types/types";
import { checkTile } from "../../helper/checkTile";

export default ({
  selected: { position, color },
  livePieces,
  Dir,
}: MoveType) => {
  const AllValidMoves: string[] = [];

  const isStarting = Dir.indexOf(position.charAt(0)) === 1;

  const frontMove = getposition(Dir, position, 1);

  const hasPiece1 = checkTile(livePieces, frontMove);

  if (!hasPiece1) {
    AllValidMoves.push(frontMove);
  } else {
    AllValidMoves.push("xx");
  }

  const TwoForward = getposition(Dir, position, 2);

  const hasPiece = checkTile(livePieces, TwoForward);
  if (isStarting && !hasPiece && !hasPiece1) {
    AllValidMoves.push(TwoForward);
  } else {
    AllValidMoves.push("xx");
  }

  const leftMove = attack(Dir, position, "-1");
  const rightMove = attack(Dir, position, "+1");

  const pieceInLeft = checkTile(livePieces, leftMove);
  const pieceInRight = checkTile(livePieces, rightMove);

  if (pieceInLeft && pieceInLeft.color !== color) {
    const isInBoard = +leftMove.charAt(1) <= 8;
    if (isInBoard) {
      AllValidMoves.push(leftMove);
    } else {
      AllValidMoves.push("xx");
    }
  }

  if (pieceInRight && pieceInRight.color !== color) {
    const isInBoard = +rightMove.charAt(1) >= 1;
    if (isInBoard) {
      AllValidMoves.push(rightMove);
    } else {
      AllValidMoves.push("xx");
    }
  }

  return AllValidMoves;
};
