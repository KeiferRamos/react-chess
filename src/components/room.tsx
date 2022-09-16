import React from "react";
import { RoomType } from "../types/types";

type PropType = RoomType & {
  selectRoom: (room: RoomType) => void;
};

function Room({ creator, name, password, id, selectRoom }: PropType) {
  return (
    <div className="room">
      <img src={`https://avatars.dicebear.com/api/avataaars/${creator}.svg`} />
      <div>
        <h2>{name}</h2>
        <p>created by: {creator}</p>
      </div>
      <button
        className="join-btn"
        onClick={() => selectRoom({ creator, name, password, id })}
      >
        join
      </button>
    </div>
  );
}

export default Room;
