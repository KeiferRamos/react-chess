import { useEffect, useState } from "react";
import Join from "../components/join";
import Create from "../components/create";
import { allRooms } from "../api/room";
import { socket } from "../index";
import { useNavigate } from "react-router";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [isJoining, setIsJoining] = useState(true);

  const nav = useNavigate();

  useEffect(() => {
    socket.on("view_rooms", (data) => {
      setRooms(data);
    });
  }, [socket]);

  useEffect(() => {
    allRooms().then((data) => {
      if (data.message) {
        nav("/react-chess/login");
      } else {
        setRooms(data);
      }
    });
  }, []);

  return (
    <div className="rooms">
      <header>
        <h1>ROOMS</h1>
        <button
          style={{
            background: `${!isJoining ? "#82454e" : "#fff"}`,
          }}
          onClick={() => setIsJoining(false)}
        >
          create room
        </button>
        <button
          style={{ background: `${isJoining ? "#82454e" : "#fff"}` }}
          onClick={() => setIsJoining(true)}
        >
          join room
        </button>
      </header>
      {isJoining ? <Join rooms={rooms} /> : <Create />}
    </div>
  );
}

export default Rooms;
