import React, { ReactElement, useReducer } from "react";

type ContextType = {
  state : initialstatetype
  dispatch : React.Dispatch<actiontype>
};

export const NotesContext = React.createContext({} as ContextType);

type PropType = {
  children: ReactElement;
};

type addnotetype = {
    type : "ADD_NOTE",
    payload : {text :string} 
}

type deleteNoteType = {
    type : "DELETE_NOTE",
    payload : {index : number}
}

type actiontype = addnotetype | deleteNoteType

type initialstatetype = {
    notes : {text : string | undefined}[]
}

const initialstate = {
  notes: []
};

const reducer = (state : initialstatetype , action: actiontype) => {
  switch (action.type) {
    case "ADD_NOTE":
        state.notes.push(action.payload)
      return state
    case "DELETE_NOTE" :
        state.notes.splice(action.payload.index , 1)
        return state
    default : 
      return state
  }
};

export default function ContextProvider(props: PropType) {
  const [state, dispatch] = useReducer(reducer, initialstate);



  return (
    <NotesContext.Provider value={{state , dispatch}}>
      {props.children}
    </NotesContext.Provider>
  );
}
