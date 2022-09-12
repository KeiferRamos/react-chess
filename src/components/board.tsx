import { useEffect, useState, useContext } from "react";
import Tile from "./tile";
import { createTable } from "../helper/createTable";
import { ContextProvider } from "../context/globalcontext";
import Dead from "./dead";

function Board() {
  const [tile, setTile] = useState<Array<Array<string>>>([]);

  const {
    state: { deadPieces },
  } = useContext(ContextProvider);

  useEffect(() => {
    setTile(createTable());
  }, []);

  const letters = "abcdefgh";

  return (
    <div className="main-container">
      <div className="white-deads">
        {deadPieces
          .filter(({ color }) => color === "white")
          .map((piece) => {
            return <Dead {...piece} />;
          })}
      </div>
      <table className="board">
        <tbody>
          {tile.map((row, i) => {
            return (
              <tr key={i}>
                {/* <td className="guide">{letters[i].toUpperCase()}</td> */}
                {row.map((data, i) => {
                  return <Tile key={i} tileID={data} />;
                })}
              </tr>
            );
          })}
        </tbody>
        {/* <tfoot>
          <tr>
            {Array.from(Array(9).keys()).map((num, i) => {
              return (
                <td className="guide" key={i}>
                  {i ? i : ""}
                </td>
              );
            })}
          </tr>
        </tfoot> */}
      </table>
      <div className="black-deads">
        {deadPieces
          .filter(({ color }) => color === "black")
          .map((piece) => {
            return <Dead {...piece} />;
          })}
      </div>
    </div>
  );
}

export default Board;
