import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { MessageType, UserInputType } from "../types/types";
import Input from "./input";
import { CREATE_USER } from "../graphql/mutation";
import { useNavigate } from "react-router";

function Register() {
  const initialValue: UserInputType = {
    username: "",
    password: "",
    confirm: "",
  };

  const [inputs, setInputs] = useState<UserInputType>(initialValue);
  const [message, setMessage] = useState<MessageType>({
    message: "Register now!",
    success: true,
  });

  const [create, { data }] = useMutation(CREATE_USER);
  const nav = useNavigate();

  useEffect(() => {
    if (data) {
      setMessage(data.createUser);
    }
  }, [data]);

  const updateInputs = (e: React.ChangeEvent, item: string) => {
    setInputs({ ...inputs, [item]: (e.target as HTMLInputElement).value });
  };

  return (
    <div className="login">
      <h2 style={{ color: `${message.success ? "#345470" : "#f5213c"}` }}>
        {message.message}
      </h2>
      {Object.keys(initialValue).map((item, i) => {
        const args = { inputs, item, updateInputs };
        return <Input key={i} {...args} />;
      })}
      <div className="btns">
        <button onClick={() => create({ variables: { input: { ...inputs } } })}>
          Create Account
        </button>
        <p style={{ marginTop: "8px", fontSize: "15px" }}>
          already have an account?
          <span className="nav-btn" onClick={() => nav("/react-chess/login")}>
            sign up.
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
