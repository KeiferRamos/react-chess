import axios from "axios";
import { UserInputType } from "../types/types";

const BASE_URL = "https://react-chess-server.herokuapp.com/api/v1/users";

export const register = async (body: UserInputType) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/register`, body);
    return data;
  } catch (error: any) {
    const errorMSG = error.response.data;
    return errorMSG;
  }
};

export const login = async (body: Omit<UserInputType, "confirm">) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/login`, body);
    return data;
  } catch (err: any) {
    const errorMSG = err.response.data;
    return errorMSG;
  }
};

export const logout = async () => {
  try {
    await axios.get(`${BASE_URL}/logout`);
  } catch (err) {
    return null;
  }
};

export const hasLoggedIn = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/isLoggedIn`);
    return data;
  } catch (error) {
    return null;
  }
};
