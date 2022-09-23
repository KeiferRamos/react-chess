import axios from "axios";
import { ColorType, PiecePropType } from "../types/types";

const BASE_URL = "https://react-chess-server.herokuapp.com/api/v1/boards";

export const updatePieces = async (
  livePieces: PiecePropType[],
  deadPieces: PiecePropType[],
  current: ColorType["color"],
  _id: string | undefined
) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/update`, {
      livePieces,
      current,
      deadPieces,
      _id,
    });
    return data;
  } catch (err) {
    return null;
  }
};
