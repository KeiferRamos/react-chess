export default (
  pieceDirection: string[],
  position: string,
  count: number
): string => {
  return `${
    pieceDirection[pieceDirection.indexOf(position.charAt(0)) + count]
  }${position[1]}`;
};
