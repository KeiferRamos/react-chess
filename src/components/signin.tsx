import { useState, useEffect } from "react";
import { MessageType, UserInputType } from "../types/types";
import { useNavigate } from "react-router";
import Input from "./input";
import { hasLoggedIn, login } from "../api/user";

function SignIn() {
  const nav = useNavigate();
  const initial = {
    username: "",
    password: "",
  };

  const [inputs, setInputs] = useState<Omit<UserInputType, "confirm">>(initial);

  const [message, setMessage] = useState<MessageType>({
    message: "Login here!",
    success: true,
  });

  const updateInputs = (e: React.ChangeEvent, item: string) => {
    setInputs({ ...inputs, [item]: (e.target as HTMLInputElement).value });
  };

  const loginUser = () => {
    login(inputs).then((data) => {
      if (data.success) {
        nav("/react-chess/rooms");
      } else {
        setMessage(data);
      }
    });
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
        <button onClick={() => loginUser()}>Sign in</button>
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
