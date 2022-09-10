import { createTable } from "../createTable";
import { moves } from "./moves";
import { blocker } from "./blocker";
import { MoveType, PiecePropType } from "../../types/types";
import { MOVE_PIECE } from "../../actions/actions";

export const RookMove = ({
  opposite,
  position,
  livePieces,
  color,
  dispatch,
  selectedPiece,
  tileID,
}: Omit<MoveType, "tileContent" | "ValidMoves">) => {
  const allDirection = createTable();
  const spreadDirection = [];

  for (var i = 0; i < allDirection.length; i++) {
    spreadDirection.push(...allDirection[i]);
  }

  let AllValidMoves = [];

  const letters = "abcdefgh";

  const Dir =
    opposite === "black" ? letters.split("").reverse() : letters.split("");

  const pieceIndex = Dir.indexOf(position.charAt(0));

  AllValidMoves = moves(spreadDirection, Dir, pieceIndex, position);

  if (color === "white") {
    AllValidMoves[0].reverse();
  }

  if (color === "black") {
    AllValidMoves[1].reverse();
  }

  AllValidMoves[3].reverse();

  AllValidMoves[0] = blocker(livePieces, AllValidMoves[0], opposite);
  AllValidMoves[1] = blocker(livePieces, AllValidMoves[1], opposite);
  AllValidMoves[2] = blocker(livePieces, AllValidMoves[2], opposite);
  AllValidMoves[3] = blocker(livePieces, AllValidMoves[3], opposite);

  const spreadMoves: string[] = [];

  AllValidMoves.forEach((moves) => {
    spreadMoves.push(...moves);
  });

  if (spreadMoves.includes(tileID)) {
    console.log("gg");
    const hasPiece = livePieces.find(({ position }) => position === tileID);
    console.log(hasPiece);

    let updatedPieces: PiecePropType[] = livePieces;

    if (hasPiece) {
      updatedPieces = livePieces.filter(({ id }) => id !== hasPiece.id);
    }

    console.log(selectedPiece, tileID);
    updatedPieces = updatedPieces.map((piece) => {
      if (selectedPiece === piece) {
        return { ...piece, position: tileID };
      } else {
        return piece;
      }
    });

    dispatch({ type: MOVE_PIECE, payload: [updatedPieces, opposite] });
  }
};