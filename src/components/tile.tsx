import {
  FaChessKing,
  FaChessQueen,
  FaChessPawn,
  FaChessRook,
  FaChessKnight,
  FaChessBishop,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { PiecePropType } from "../types/types";
import Army from "../pieces/index";

const pieces = {
  pawn: <FaChessPawn />,
  rook: <FaChessRook />,
  knight: <FaChessKnight />,
  bishop: <FaChessBishop />,
  queen: <FaChessQueen />,
  king: <FaChessKing />,
};

function Tile({ tileID }: { tileID: string }) {
  const [tileContent, setTileContent] = useState<PiecePropType | null>(null);
  const [tileBG, setTileBG] = useState<string>("");
  const oddLetters = "aceg";

  useEffect(() => {
    for (var i = 0; i < Army.length; i++) {
      if (Army[i].position == tileID) {
        setTileContent(Army[i]);
        break;
      }
    }
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
      onClick={() => console.log(tileID, tileContent?.position)}
    >
      {pieces[tileContent?.name as keyof typeof pieces]}
    </td>
  );
}

export default Tile;
