import React, { useState, useEffect } from "react";
import { MessageType, UserInputType } from "../types/types";
import Input from "./input";
import { useNavigate } from "react-router";
import { register } from "../api/user";

function Register() {
  const initialValue: UserInputType = {
    username: "",
    password: "",
    confirm: "",
  };

  const [inputs, setInputs] = useState<UserInputType>(initialValue);
  const [message, setMessage] = useState<MessageType | null>({
    message: "Register now!",
    success: true,
  });

  const nav = useNavigate();

  const updateInputs = (e: React.ChangeEvent, item: string) => {
    setInputs({ ...inputs, [item]: (e.target as HTMLInputElement).value });
  };

  const registerUser = async () => {
    register(inputs).then((data) => setMessage(data));
  };

  return (
    <div className="login">
      <h2 style={{ color: `${message?.success ? "#345470" : "#f5213c"}` }}>
        {message?.message}
      </h2>
      {Object.keys(initialValue).map((item, i) => {
        const args = { inputs, item, updateInputs };
        return <Input key={i} {...args} />;
      })}
      <div className="btns">
        <button onClick={() => registerUser()}>Create Account</button>
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
