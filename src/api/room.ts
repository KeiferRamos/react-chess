import axios from "axios";
import { joinRoomType } from "../types/types";

const BASE_URL = "http://localhost:5000/api/v1/rooms";

export const create = async (body: joinRoomType) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/create`, body);
    return data;
  } catch (err: any) {
    const errorMSG = err.response.data;
    return errorMSG;
  }
};

export const allRooms = async () => {
  try {
    const { data } = await axios.get(BASE_URL);
    return data;
  } catch (err: any) {
    const errorMSG = err.response.data;
    return errorMSG;
  }
};

export const joinRoom = async (id: string, password: string) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/join`, { id, password });
    return data;
  } catch (err: any) {
    const errorMSG = err.response.data;
    return errorMSG;
  }
};

export const findRoom = async (_id: string | undefined) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/room`, { _id });
    return data;
  } catch (err: any) {
    const errorMSG = err.response.data;
    return errorMSG;
  }
};

export const leaveRoom = async (_id: string | undefined) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/leave`, { _id });
    return data;
  } catch (error: any) {
    const errorMSG = error.response.data;
    return errorMSG;
  }
};
