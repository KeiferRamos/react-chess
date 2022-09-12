export default (
  pieceDirection: string[],
  position: string,
  horizontal: "-1" | "+1"
): string => {
  let directionCount;
  if (horizontal === "+1") {
    directionCount = +position[1] - 1;
  } else {
    directionCount = +position[1] + 1;
  }
  return `${
    pieceDirection[pieceDirection.indexOf(position[0]) + 1]
  }${directionCount}`;
};
