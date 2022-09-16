import React, { useEffect, useState } from "react";
import { RoomType } from "../types/types";
import Modal from "./modal";
import Room from "./room";
import Input from "./input";
import { useNavigate } from "react-router";

type PropType = {
  rooms: RoomType[];
};

function Join({ rooms }: PropType) {
  const nav = useNavigate();
  const [isJoining, setIsJoining] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);

  const selectRoom = (room: RoomType) => {
    setSelectedRoom(room);
  };

  useEffect(() => {
    if (selectedRoom) {
      setIsJoining(true);
    }
  }, [selectRoom]);

  const updateInputs = (e: React.ChangeEvent) => {
    setPassword((e.target as HTMLInputElement).value);
  };

  const validateUser = () => {
    if (password === selectedRoom!.password) {
      nav("/react-chess/game");
    }
  };

  const args = { inputs: password, item: "password", updateInputs };

  return (
    <div className="rooms-container">
      {rooms.map((room, i) => {
        return <Room key={i} {...room} selectRoom={selectRoom} />;
      })}
      {isJoining && (
        <Modal
          children={
            <div className="join-room">
              <p>Please enter room password</p>
              <Input {...args} />
              <br />
              <button onClick={() => validateUser()}>join room</button>
              <button>cancel join</button>
            </div>
          }
        />
      )}
    </div>
  );
}

export default Join;
