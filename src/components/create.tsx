import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FaChessPawn } from "react-icons/fa";
import { useNavigate } from "react-router";
import { CREATE_ROOM } from "../graphql/mutation";
import Input from "./input";

function Create() {
  const nav = useNavigate();
  const initialValue = {
    name: "",
    password: "",
  };

  const [create, { data }] = useMutation(CREATE_ROOM);

  const [inputs, setInputs] = useState(initialValue);
  const [message, setMessage] = useState("create room here!");
  const [selected, setSelected] = useState<string | null>(null);

  const updateInputs = (e: React.ChangeEvent, item: string) => {
    setInputs({ ...inputs, [item]: (e.target as HTMLInputElement).value });
  };

  const createRoom = () => {
    const creator = localStorage.getItem("username")!;
    create({ variables: { input: { selected, creator, ...inputs } } });
    nav("/react-chess/game");
  };

  useEffect(() => {
    if (data) {
      setMessage(data.createRoom.message);
    }
  }, [data]);

  return (
    <div className="creators-room">
      <h2 style={{ textAlign: "center", margin: "15px" }}>{message}</h2>
      <div className="color-options">
        {["black", "white"].map((color, i) => {
          return (
            <button
              key={i}
              style={{
                color,
                background: `${selected === color ? "#3374b3" : "#82454e"}`,
              }}
              className="select-color"
              onClick={() => setSelected(color)}
            >
              <FaChessPawn />
              <p style={{ fontSize: "14px" }}>{color}</p>
            </button>
          );
        })}
      </div>
      {Object.keys(inputs).map((item, i) => {
        const args = { inputs, item, updateInputs };
        return <Input key={i} {...args} />;
      })}
      <button onClick={() => createRoom()}>create room</button>
    </div>
  );
}

export default Create;
