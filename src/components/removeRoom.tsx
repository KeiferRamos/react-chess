import { useMutation } from "@apollo/client";
import { ContextProvider } from "../context/globalcontext";
import { REMOVE_ROOM } from "../graphql/mutation";
import { useContext } from "react";
import { CANCEL_BACK } from "../actions/actions";
import { useNavigate } from "react-router";

function RemoveRoom() {
  const { dispatch } = useContext(ContextProvider);
  const [remove] = useMutation(REMOVE_ROOM);
  const nav = useNavigate();

  const confirmRemove = () => {
    const room = localStorage.getItem("room")!;
    remove({ variables: { name: JSON.parse(room).roomName } });
    localStorage.removeItem("room");
    nav(-1);
  };

  return (
    <div>
      <p>If you do this, There's no turning back. I mean this room will be</p>
      <p>automatically removed. Are you sure you want to go back?</p>
      <br />
      <button onClick={() => confirmRemove()}>yes</button>
      <button onClick={() => dispatch({ type: CANCEL_BACK })}>cancel</button>
    </div>
  );
}

export default RemoveRoom;
