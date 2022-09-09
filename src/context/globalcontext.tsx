import React, { createContext, useReducer } from "react";
import { reducer } from "../reducer/reducer";
import { store as initialState } from "../store/store";
import { StorePropType } from "../types/types";
import { reducerType } from "../types/types";

export const ContextProvider = createContext({} as reducerPropType);

type reducerPropType = {
  state: StorePropType;
  dispatch: React.Dispatch<reducerType>;
};

type containerType = {
  children: React.ReactNode;
};

function Globalcontext({ children }: containerType) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ContextProvider.Provider value={{ state, dispatch }}>
      {children}
    </ContextProvider.Provider>
  );
}

export default Globalcontext;
