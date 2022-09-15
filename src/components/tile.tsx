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
import {
  CHECK_MATE,
  KILL_PIECE,
  MOVE_PIECE,
  OPEN_MODAL,
  SELECT_PIECE,
} from "../actions/actions";
import PawnMove from "../pieces/pawn/index";
import { RookMove } from "../pieces/rook";
import { KnightMove } from "../pieces/knight";
import { BishopMove } from "../pieces/bishop";
import { QueenMove } from "../pieces/queen/moves";
import { KingMove } from "../pieces/king";
import select from "../functions/select";
import { createTable } from "../helper/createTable";
import { getDirection } from "../helper/direction";
import { movePiece } from "../functions/move";

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
    state: { selectedPiece, livePieces, allValidMoves, current },
    dispatch,
  } = useContext(ContextProvider);

  const oddLetters = "aceg";

  const selectAndmovePiece = () => {
    const selected = livePieces.find(({ position }) => position === tileID);

    const allMoves = {
      pawn: (args: MoveType) => PawnMove(args),
      bishop: (args: MoveType) => BishopMove(args),
      king: (args: MoveType) => KingMove(args),
      knight: (args: MoveType) => KnightMove(args),
      rook: (args: MoveType) => RookMove(args),
      queen: (args: MoveType) => QueenMove(args),
    };

    if (selectedPiece && allValidMoves.includes(tileID)) {
      movePiece({ livePieces, tileID, selectedPiece, dispatch, allMoves });
    }
    if (selected && selected.color === current) {
      const validMoves = select({ selected, allMoves, livePieces });
      dispatch({ type: SELECT_PIECE, payload: [selected, validMoves] });
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
    if (selectedPiece && selectedPiece === tileContent) {
      setTileBG("#bebebe");
    } else {
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
    }
    if (allValidMoves.includes(tileID)) {
      setTileBG("#b8c0ca");
    }
  }, [selectedPiece, allValidMoves]);

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
