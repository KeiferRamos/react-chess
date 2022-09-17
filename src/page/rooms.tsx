import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ROOMS } from "../graphql/query";
import { RoomType } from "../types/types";
import Join from "../components/join";
import Create from "../components/create";

function Rooms() {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [isJoining, setIsJoining] = useState(true);
  const { data, refetch } = useQuery(GET_ROOMS);

  useEffect(() => {
    if (data) {
      const { rooms } = data.rooms;
      if (rooms) {
        setRooms(rooms);
      }
    }
  }, [data]);

  return (
    <div className="rooms">
      <header>
        <h1>ROOMS</h1>
        <button
          style={{
            background: `${
              !isJoining || rooms.length <= 0 ? "#82454e" : "#fff"
            }`,
          }}
          onClick={() => setIsJoining(false)}
        >
          create room
        </button>
        {rooms.length > 0 && (
          <button
            style={{ background: `${isJoining ? "#82454e" : "#fff"}` }}
            onClick={() => setIsJoining(true)}
          >
            join room
          </button>
        )}
      </header>
      {rooms.length > 0 && isJoining ? (
        <Join rooms={rooms} />
      ) : (
        <Create refetch={refetch} />
      )}
    </div>
  );
}

export default Rooms;
