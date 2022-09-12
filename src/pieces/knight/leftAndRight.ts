export const getHorPosition = (
  position: string,
  pieceDir: string[],
  type: "left" | "right"
) => {
  const leftAndRight = [];
  const MoveDir =
    type === "left" ? +position.charAt(1) > 2 : +position.charAt(1) < 7;

  const pieceIndex = pieceDir.indexOf(position.charAt(0));

  const bottomHorizontal = pieceDir[pieceIndex - 1];
  const topHorizontal = pieceDir[pieceIndex + 1];

  if (MoveDir) {
    const dir =
      type === "left" ? +position.charAt(1) - 2 : +position.charAt(1) + 2;

    if (bottomHorizontal) {
      const bottomHorizontalMove = `${bottomHorizontal}${dir}`;

      leftAndRight.push(bottomHorizontalMove);
    }
    if (topHorizontal) {
      const topHorizontal = pieceDir[pieceIndex + 1];

      const topHorizontalMove = `${topHorizontal}${dir}`;
      leftAndRight.push(topHorizontalMove);
    }
  }

  return leftAndRight;
};
