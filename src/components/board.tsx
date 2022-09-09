import { useEffect, useState } from "react";
import Tile from "./tile";
import { createTable } from "../helper/createTable";

function Board() {
  const [tile, setTile] = useState<Array<Array<string>>>([]);
  useEffect(() => {
    setTile(createTable());
  }, []);

  return (
    <table className="board">
      <tbody>
        {tile.map((row, i) => {
          return (
            <tr key={i}>
              {row.map((data, i) => {
                return <Tile key={i} tileID={data} />;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Board;
