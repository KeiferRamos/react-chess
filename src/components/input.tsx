import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { InputType } from "../types/types";

function Input({ inputs, item, updateInputs }: InputType) {
  const [hasShow, setHasShow] = useState(false);

  const togglePassword = () => {
    setHasShow(!hasShow);
  };

  if (item === "username") {
    return (
      <div className="input-container">
        <input
          value={inputs[item as keyof typeof inputs]}
          type="text"
          placeholder={item}
          onChange={(e) => updateInputs(e, item)}
        />
      </div>
    );
  } else {
    return (
      <div className="input-container">
        <input
          value={inputs[item as keyof typeof inputs]}
          type={hasShow ? "text" : "password"}
          placeholder={item}
          onChange={(e) => updateInputs(e, item)}
        />
        <div>
          {hasShow ? (
            <FiEyeOff onClick={() => togglePassword()} />
          ) : (
            <FiEye onClick={() => togglePassword()} />
          )}
        </div>
      </div>
    );
  }
}

export default Input;
