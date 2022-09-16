import { useState, useEffect } from "react";
import { MessageType, UserInputType } from "../types/types";
import { useLazyQuery } from "@apollo/client";
import { LOGIN } from "../graphql/query";
import { useNavigate } from "react-router";
import Input from "./input";

function SignIn() {
  const initial = {
    username: "",
    password: "",
  };

  const [inputs, setInputs] = useState<Omit<UserInputType, "confirm">>(initial);
  const [message, setMessage] = useState<MessageType>({
    message: "Login here!",
    success: true,
  });

  const [login, { data }] = useLazyQuery(LOGIN);
  const nav = useNavigate();

  useEffect(() => {
    if (data) {
      setMessage(data.user);
    }
  }, [data]);

  useEffect(() => {
    if (message.user) {
      localStorage.setItem("username", message.user.username);
      nav("/react-chess/rooms");
    }
  }, [message]);

  const updateInputs = (e: React.ChangeEvent, item: string) => {
    setInputs({ ...inputs, [item]: (e.target as HTMLInputElement).value });
  };

  return (
    <div className="login">
      <h2 style={{ color: `${message.success ? "#345470" : "#f5213c"}` }}>
        {message.message}
      </h2>
      {Object.keys(inputs).map((item, i) => {
        const args = { inputs, item, updateInputs };
        return <Input key={i} {...args} />;
      })}
      <div className="btns">
        <button onClick={() => login({ variables: { input: { ...inputs } } })}>
          Sign in
        </button>
        <p style={{ marginTop: "8px", fontSize: "15px" }}>
          dont have an account yet?
          <span
            className="nav-btn"
            onClick={() => nav("/react-chess/register")}
          >
            create.
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
