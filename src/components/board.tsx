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

  return (
    <div className="main-container">
      <div className="white-deads">
        {deadPieces
          .filter(({ color }) => color === "white")
          .sort((a, b) => {
            return a.id - b.id;
          })
          .map((piece, i) => {
            return <Dead key={i} {...piece} />;
          })}
      </div>
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
      <div className="black-deads">
        {deadPieces
          .filter(({ color }) => color === "black")
          .sort((a, b) => {
            return a.id - b.id;
          })
          .map((piece, i) => {
            return <Dead key={i} {...piece} />;
          })}
      </div>
    </div>
  );
}

export default Board;
