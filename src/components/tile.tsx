import {
  FaChessKing,
  FaChessQueen,
  FaChessPawn,
  FaChessRook,
  FaChessKnight,
  FaChessBishop,
} from "react-icons/fa";

import { useState, useEffect, useContext } from "react";
import { PiecePropType } from "../types/types";
import { ContextProvider } from "../context/globalcontext";
import { SELECT_PIECE } from "../actions/actions";
import PawnMove from "../helper/pawn/index";
import { KingMoves } from "../helper/king";
import { createTable } from "../helper/createTable";
import { blocker } from "../helper/rook/blocker";
import { moves } from "../helper/rook/moves";
import { RookMove } from "../helper/rook";

const pieces = {
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
      const opposite = current === "white" ? "black" : "white";

      const ValidMoves: Boolean[] = [false, false];

      ValidMoves[0] = livePieces.some(
        ({ position, color }) => tileID === position && color === opposite
      );

      ValidMoves[1] = livePieces.every(({ position }) => tileID !== position);

      const isallMovesValid = ValidMoves.some((el) => el);

      if (isallMovesValid) {
        const { name, color, position } = selectedPiece;

        if (name === "pawn") {
          PawnMove({
            selectedPiece,
            livePieces,
            tileID,
            ValidMoves,
            position,
            dispatch,
            tileContent,
            opposite,
          });
        }

        if (name === "king") {
          KingMoves({
            color,
            position,
            livePieces,
            dispatch,
            tileID,
            selectedPiece,
            opposite,
          });
        }

        if (name === "rook") {
          RookMove({
            opposite,
            position,
            livePieces,
            color,
            dispatch,
            selectedPiece,
            tileID,
          });
        }

        if (name === "bishop") {
        }
      } else {
        dispatch({ type: SELECT_PIECE, payload: tileContent });
        return;
      }
    } else {
      const hasPiece = livePieces.find(({ position }) => position === tileID);

      if (hasPiece && hasPiece.color === current) {
        dispatch({ type: SELECT_PIECE, payload: tileContent });
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
