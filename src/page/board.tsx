import { useContext, useEffect, useState } from "react";
import Header from "../components/header";
import Board from "../components/board";
import Modal from "../components/modal";
import Promoted from "../components/promoted";
import EndGame from "../components/checkmate";
import { ContextProvider } from "../context/globalcontext";
import { useParams } from "react-router";
import { findRoom, leaveRoom } from "../api/room";
import { socket } from "../index";
import { CHECK_MATE, SET_BOARD, UPDATE_BOARD } from "../actions/actions";
import { UpdatePayloadType } from "../types/types";

function Game() {
  const { _id } = useParams();
  const {
    state: { isCheckmate, isPawnPromoted },
    dispatch,
  } = useContext(ContextProvider);
  const [invalidID, setInvalidID] = useState(false);
  const [errorMSG, setErrorMSG] = useState("");

  useEffect(() => {
    findRoom(_id).then((data) => {
      if (data.success) {
        const {
          room: {
            game: { livePieces, current },
          },
        } = data;
        setInvalidID(false);
        dispatch({
          type: SET_BOARD,
          payload: [livePieces, current, _id],
        });
      } else {
        setInvalidID(true);
        setErrorMSG(data.message);
      }
    });
  }, []);

  useEffect(() => {
    socket.on("view_board", (data: UpdatePayloadType) => {
      dispatch({ type: UPDATE_BOARD, payload: data });
    });
    socket.on("view_modal", () => {
      dispatch({ type: CHECK_MATE });
    });
  }, [socket]);

  useEffect(() => {
    function eventHandler() {
      leaveRoom(_id).then(() => socket.emit("leave_room"));
    }

    window.addEventListener("popstate", () => eventHandler());

    return () => window.removeEventListener("popstate", () => eventHandler());
  }, []);

  if (invalidID) {
    return <div>{errorMSG}</div>;
  } else {
    return (
      <>
        <Header />
        <Board />
        {isPawnPromoted && <Modal children={<Promoted />} />}
        {isCheckmate && <Modal children={<EndGame />} />}
      </>
    );
  }
}

export default Game;
