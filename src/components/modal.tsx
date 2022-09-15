import { useRef, useEffect } from "react";
import Draggable from "react-draggable";

type containerType = {
  children: React.ReactNode;
};

function Modal({ children }: containerType) {
  const ref = useRef({} as HTMLDivElement);

  useEffect(() => {
    function eventHandler(e: Event) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        ref.current.style.border = "2px solid red";

        setTimeout(() => {
          ref.current.style.border = "none";
        }, 200);
      }
    }

    document.body.addEventListener("mousedown", (e) => eventHandler(e));

    return () =>
      document.body.removeEventListener("mousedown", (e) => eventHandler(e));
  }, []);

  return (
    <div className="modal-container">
      <Draggable>
        <div className="modal-content" ref={ref}>
          {children}
        </div>
      </Draggable>
    </div>
  );
}

export default Modal;
