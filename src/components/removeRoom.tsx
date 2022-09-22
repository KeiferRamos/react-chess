import { ContextProvider } from "../context/globalcontext";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

function RemoveRoom() {
  const { dispatch } = useContext(ContextProvider);
  const [isCreatorLeaving, setIsCreatorLeaving] = useState(false);
  const nav = useNavigate();

  const confirmRemove = () => {};

  return (
    <div>
      {isCreatorLeaving ? (
        <>
          <p>
            If you do this, There's no turning back. I mean this room will be
          </p>
          <p>automatically removed. Are you sure you want to go back?</p>
        </>
      ) : (
        <p>Are you sure you want to leave this room?</p>
      )}

      <br />
      <button onClick={() => confirmRemove()}>yes</button>
      <button>cancel</button>
    </div>
  );
}

export default RemoveRoom;
