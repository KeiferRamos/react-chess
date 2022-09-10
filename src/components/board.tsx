import { useEffect, useState } from "react";
import Tile from "./tile";
import { createTable } from "../helper/createTable";

function Board() {
  const [tile, setTile] = useState<Array<Array<string>>>([]);
  useEffect(() => {
    setTile(createTable());
  }, []);

  const letters = "abcdefgh";

  return (
    <table className="board">
      <tbody>
        {tile.map((row, i) => {
          return (
            <tr key={i}>
              <td className="guide">{letters[i].toUpperCase()}</td>
              {row.map((data, i) => {
                return <Tile key={i} tileID={data} />;
              })}
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          {Array.from(Array(9).keys()).map((num, i) => {
            return (
              <td className="guide" key={i}>
                {i ? i : ""}
              </td>
            );
          })}
        </tr>
      </tfoot>
    </table>
  );
}

export default Board;
