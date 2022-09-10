export const moves = (
  spreadDirection: string[],
  Dir: string[],
  pieceIndex: number,
  position: string
) => {
  let forwardMoves = spreadDirection.filter((pos) => {
    return (
      Dir.indexOf(pos.charAt(0)) >= pieceIndex &&
      pos.charAt(1) === position.charAt(1) &&
      pos !== position
    );
  });

  let BackwardMoves = spreadDirection.filter((pos) => {
    return (
      Dir.indexOf(pos.charAt(0)) <= pieceIndex &&
      pos.charAt(1) === position.charAt(1) &&
      pos !== position
    );
  });

  let leftMoves = spreadDirection.filter((pos) => {
    return (
      +pos.charAt(1) > +position.charAt(1) &&
      pos.charAt(0) === position.charAt(0)
    );
  });

  let rightMoves = spreadDirection.filter((pos) => {
    return (
      +pos.charAt(1) < +position.charAt(1) &&
      pos.charAt(0) === position.charAt(0)
    );
  });

  return [forwardMoves, BackwardMoves, leftMoves, rightMoves];
};
