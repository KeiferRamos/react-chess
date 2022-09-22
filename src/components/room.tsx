import { RoomType } from "../types/types";

type joinRoomType = RoomType & { join: (_id: string) => void };

function Room({ name, creator, _id, players, join }: joinRoomType) {
  return (
    <div className="room">
      <div className="players-count">{players.length} / 2</div>
      <img src={`https://avatars.dicebear.com/api/avataaars/${creator}.svg`} />
      <div>
        <h2>{name}</h2>
        <p>created by: {creator}</p>
      </div>
      <button className="join-btn" onClick={() => join(_id)}>
        join
      </button>
    </div>
  );
}

export default Room;
