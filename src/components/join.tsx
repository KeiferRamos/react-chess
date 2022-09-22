import React, { useContext, useState } from "react";
import { MessageType } from "../types/types";
import Modal from "./modal";
import Room from "./room";
import Input from "./input";
import { useNavigate } from "react-router";
import { joinRoom } from "../api/room";
import { RoomType } from "../types/types";
import { socket } from "../index";
import { ContextProvider } from "../context/globalcontext";
import { SET_SELECTED } from "../actions/actions";

type PropType = {
  rooms: RoomType[];
};

function Join({ rooms }: PropType) {
  const { dispatch } = useContext(ContextProvider);
  const nav = useNavigate();
  const [roomID, setRoomID] = useState<string | null>(null);
  const [isFull, setIsFull] = useState(false);
  const [message, setMessage] = useState<MessageType>({
    message: "Please enter room password",
    success: false,
  });

  const [password, setPassword] = useState<string>("");

  const updateInputs = (e: React.ChangeEvent) => {
    setPassword((e.target as HTMLInputElement).value);
  };

  const validateUser = () => {
    joinRoom(roomID!, password).then((data) => {
      if (data.success) {
        dispatch({ type: SET_SELECTED, payload: data.userSelected });
        nav(`/react-chess/game/${roomID}`);
        socket.emit("join_room");
      } else {
        setMessage(data);
      }
    });
  };

  const join = (_id: string) => {
    const room = rooms.find((room) => room._id === _id)!;
    if (room.players.length === 2) {
      setIsFull(true);
    } else {
      setRoomID(_id);
    }
  };

  const args = { inputs: password, item: "password", updateInputs };

  return (
    <div className="rooms-container">
      {rooms.length > 0 ? (
        rooms.map((room, i) => {
          return <Room key={i} {...room} join={join} />;
        })
      ) : (
        <p className="modal-text">no rooms available</p>
      )}
      {isFull && (
        <Modal
          children={
            <div>
              <p>room is full</p>
              <button onClick={() => setIsFull(false)}>ok</button>
            </div>
          }
        />
      )}
      {roomID && (
        <Modal
          children={
            <div className="join-room">
              <p>{message.message}</p>
              <Input {...args} />
              <button onClick={() => validateUser()}>join room</button>
              <button onClick={() => setRoomID(null)}>cancel join</button>
            </div>
          }
        />
      )}
    </div>
  );
}

export default Join;
