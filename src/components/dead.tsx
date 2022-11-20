import { PiecePropType } from "../types/types";
import { pieces } from "../components/tile";

function Dead({ color, name }: PiecePropType) {
  return <div style={{ color }}>{pieces[name as keyof typeof pieces]}</div>;
}

export default Dead;
