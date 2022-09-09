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
import { MOVE_PIECE, OPEN_MODAL, SELECT_PIECE } from "../actions/actions";
import getposition from "../helper/getposition";
import attack from "../helper/attack";

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
        const { name, color, position, id: selectedID } = selectedPiece;

        if (name === "pawn") {
          let pieceDirection;
          const verticalDirection = "abcdefgh";

          if (color === "white") {
            pieceDirection = verticalDirection.split("").reverse();
          } else {
            pieceDirection = verticalDirection.split("");
          }

          if (ValidMoves[1]) {
            const rightDirection = [
              getposition(pieceDirection, position, 1),
              getposition(pieceDirection, position, 2),
            ];

            if (pieceDirection.indexOf(position.charAt(0)) > 1) {
              rightDirection.pop();
            }

            if (rightDirection.includes(tileID)) {
              const updatedPiecesPositions = livePieces.map((piece) => {
                if (piece.id === selectedID) {
                  return { ...piece, position: tileID };
                } else {
                  return piece;
                }
              });

              dispatch({
                type: MOVE_PIECE,
                payload: [updatedPiecesPositions, opposite],
              });
            }
          } else if (ValidMoves[0]) {
            const validAttack = [
              attack(pieceDirection, position, "+1"),
              attack(pieceDirection, position, "-1"),
            ];

            if (validAttack.includes(tileContent!.position)) {
              const updatedPiecesPositions = livePieces
                .filter(({ position }) => tileID !== position)
                .map((piece) => {
                  if (piece.id === selectedID) {
                    return { ...piece, position: tileID };
                  } else {
                    return piece;
                  }
                });

              if (
                position.charAt(0) ===
                  pieceDirection[pieceDirection.length - 2] &&
                tileID.charAt(0) === pieceDirection[pieceDirection.length - 1]
              ) {
                dispatch({ type: OPEN_MODAL });
              }

              dispatch({
                type: MOVE_PIECE,
                payload: [updatedPiecesPositions, opposite],
              });
            }
          }
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
