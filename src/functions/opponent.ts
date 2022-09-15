import { PiecePropType } from "../types/types";
import { getDirection } from "../helper/direction";

export default (
  opponentPieces: PiecePropType[],
  allMoves: any,
  livePieces: PiecePropType[]
): [string[], string[]] => {
  const opponentMoves: string[] = [];
  const kingTreath: string[] = [];

  opponentPieces.forEach((piece) => {
    const currentSelected = piece.name as keyof typeof allMoves;
    const directions = getDirection(piece.color);

    const { position } = livePieces.find(({ color, name }) => {
      return color !== piece.color && name === "king";
    })!;

    const validMoves = allMoves[currentSelected]({
      livePieces,
      selected: piece,
      Dir: directions,
    });

    if (piece.name === "pawn") {
      validMoves.splice(0, 2);
    }

    if (validMoves.includes(position)) {
      kingTreath.push(piece.position);
    }

    opponentMoves.push(...validMoves);
  });

  return [opponentMoves, kingTreath];
};
