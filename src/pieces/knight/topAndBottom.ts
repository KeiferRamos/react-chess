export const getVerPosition = (
  position: string,
  pieceDir: string[],
  type: "top" | "bot"
) => {
  const moves = [];
  const index = pieceDir.indexOf(position.charAt(0));
  const topOrBot = pieceDir[type === "top" ? index + 2 : index - 2];

  if (topOrBot) {
    const left = +position.charAt(1) > 1;
    const right = +position.charAt(1) < 8;
    if (left) {
      moves.push(`${topOrBot}${+position.charAt(1) - 1}`);
    }
    if (right) {
      moves.push(`${topOrBot}${+position.charAt(1) + 1}`);
    }
  }

  return moves;
};
