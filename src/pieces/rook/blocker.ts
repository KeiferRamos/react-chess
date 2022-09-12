import { ColorType, PiecePropType } from "../../types/types";

export const blocker = (
  livePieces: PiecePropType[],
  MoveArray: Array<string>,
  opposite: ColorType["color"]
) => {
  const hasPieceInForward = livePieces.filter(({ position }) =>
    MoveArray.includes(position)
  );

  const PiecesInForward = hasPieceInForward.map(({ position }) => position);

  let startingPoint = "";

  for (var i = 0; i < MoveArray.length; i++) {
    if (PiecesInForward.includes(MoveArray[i])) {
      startingPoint = MoveArray[i];
      break;
    }
  }

  const pieceIndex = MoveArray.indexOf(startingPoint);

  return MoveArray.filter((e, i) => {
    const piece = livePieces.find(({ position }) => position === startingPoint);
    if (piece?.color === opposite) {
      return i <= pieceIndex;
    } else if (!startingPoint) {
      return e;
    }
    return i < pieceIndex;
  });
};
