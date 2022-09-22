import React, { useContext, useState } from "react";
import { FaChessPawn } from "react-icons/fa";
import { useNavigate } from "react-router";
import Input from "./input";
import { MessageType, joinRoomType } from "../types/types";
import { create } from "../api/room";
import { socket } from "../index";
import { ContextProvider } from "../context/globalcontext";
import { SET_SELECTED } from "../actions/actions";

function Create() {
  const { dispatch } = useContext(ContextProvider);
  const nav = useNavigate();
  const initialValue = {
    name: "",
    password: "",
    selected: "",
  };

  const [inputs, setInputs] = useState<joinRoomType>(initialValue);

  const [message, setMessage] = useState<MessageType>({
    message: "create room here!",
    success: false,
  });

  const updateInputs = (e: React.ChangeEvent, item: string) => {
    setInputs({ ...inputs, [item]: (e.target as HTMLInputElement).value });
  };

  const createRoom = () => {
    create({ ...inputs }).then((data) => {
      if (data.success) {
        dispatch({ type: SET_SELECTED, payload: data.userColor });
        socket.emit("create_room");
        nav(`/react-chess/game/${data.room._id}`);
      } else {
        setMessage(data);
      }
    });
  };

  return (
    <div className="creators-room">
      <h2 style={{ textAlign: "center", margin: "15px" }}>{message.message}</h2>
      <div className="color-options">
        {["black", "white"].map((color, i) => {
          return (
            <button
              key={i}
              style={{
                color,
                background: `${
                  inputs.selected === color ? "#3374b3" : "#82454e"
                }`,
              }}
              className="select-color"
              onClick={() => setInputs({ ...inputs, selected: color })}
            >
              <FaChessPawn />
              <p style={{ fontSize: "14px" }}>{color}</p>
            </button>
          );
        })}
      </div>
      {["name", "password"].map((item, i) => {
        const args = { inputs, item, updateInputs };
        return <Input key={i} {...args} />;
      })}
      <button onClick={() => createRoom()}>create room</button>
    </div>
  );
}

export default Create;
