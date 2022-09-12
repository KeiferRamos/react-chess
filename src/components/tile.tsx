import {
  FaChessKing,
  FaChessQueen,
  FaChessPawn,
  FaChessRook,
  FaChessKnight,
  FaChessBishop,
} from "react-icons/fa";

import { useState, useEffect, useContext } from "react";
import { MoveType, PiecePropType } from "../types/types";
import { ContextProvider } from "../context/globalcontext";
import { SELECT_PIECE } from "../actions/actions";
import PawnMove from "../pieces/pawn/index";
import { KingMove } from "../pieces/king";
import { RookMove } from "../pieces/rook";
import { KnightMove } from "../pieces/knight/moves";
import { BishopMove } from "../pieces/bishop/moves";
import { QueenMove } from "../pieces/queen/moves";

export const pieces = {
  pawn: <FaChessPawn />,
  rook: <FaChessRook />,
  knight: <FaChessKnight />,
  bishop: <FaChessBishop />,
  queen: <FaChessQueen />,
  king: <FaChessKing />,
};

function Tile({ tileID }: { tileID: string }) {
  const [tileContent, setTileContent] = useState<PiecePropType | null>(
    {} as PiecePropType
  );

  const [tileBG, setTileBG] = useState<string>("");

  const {
    state: { current, selectedPiece, livePieces },
    dispatch,
  } = useContext(ContextProvider);

  const oddLetters = "aceg";

  const selectAndmovePiece = () => {
    if (selectedPiece) {
      const opposite: "white" | "black" =
        current === "white" ? "black" : "white";

      const ValidMoves: Boolean[] = [false, false];

      ValidMoves[0] = livePieces.some(
        ({ position, color }) => tileID === position && color === opposite
      );

      ValidMoves[1] = livePieces.every(({ position }) => tileID !== position);

      const hasValidMoves = ValidMoves.some((el) => el);

      if (hasValidMoves) {
        const { name, color, position } = selectedPiece;

        const args = {
          position,
          color,
          livePieces,
          tileID,
          dispatch,
          selectedPiece,
          opposite,
          tileContent,
          ValidMoves,
        };

        const AllMoves = {
          pawn: (args: MoveType) => PawnMove(args),
          rook: (args: MoveType) => RookMove(args),
          knight: (args: MoveType) => KnightMove(args),
          bishop: (args: MoveType) => BishopMove(args),
          king: (args: MoveType) => KingMove(args),
          queen: (args: MoveType) => QueenMove(args),
        };

        AllMoves[name as keyof typeof AllMoves](args);
      } else {
        dispatch({ type: SELECT_PIECE, payload: tileContent! });
        return;
      }
    } else {
      const hasPiece = livePieces.find(({ position }) => position === tileID);

      if (hasPiece && hasPiece.color === current) {
        dispatch({ type: SELECT_PIECE, payload: tileContent! });
        return;
      }
    }
  };

  const updatePiecePosition = () => {
    for (var i = 0; i < livePieces.length; i++) {
      if (livePieces[i].position === tileID) {
        setTileContent(livePieces[i]);
        break;
      } else {
        setTileContent(null);
      }
    }
  };

  useEffect(() => {
    updatePiecePosition();
  }, [livePieces]);

  useEffect(() => {
    if (oddLetters.includes(tileID.charAt(0))) {
      if (+tileID.charAt(1) % 2 === 0) {
        setTileBG("#82454e");
      } else {
        setTileBG("#a08185");
      }
    } else {
      if (+tileID.charAt(1) % 2 === 1) {
        setTileBG("#82454e");
      } else {
        setTileBG("#a08185");
      }
    }
  }, []);

  return (
    <td
      style={{ color: tileContent?.color, background: tileBG }}
      onClick={() => selectAndmovePiece()}
    >
      {pieces[tileContent?.name as keyof typeof pieces]}
    </td>
  );
}

export default Tile;
