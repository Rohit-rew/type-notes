import React from "react";
import Header from "./header";
import Note from "./note";
import { NotesContext } from "./context";

export default function App() {
  const data = React.useContext(NotesContext);

  const [note, setNote] = React.useState<string>("");
  const [render, setrender] = React.useState<boolean>(false);

  
  const deleteNote = (i:number)=>{
    data.dispatch({
      type : "DELETE_NOTE",
      payload : {index : i}
    })
    setrender(val=>!val)
  }
  
  const notesJsx = data.state.notes.map((note , i) => {
    return (
      <Note key={i} note={note} index={i} deleteNote={deleteNote}/>
    );
  });
  
  const saveNote = (e: React.KeyboardEvent):void => {
    if (e.key === "Enter") {
      console.log("yess")
      if (!note) return;
      data.dispatch({
        type: "ADD_NOTE",
        payload: {
          text: note,
          striked : false
        },
      });

      setNote(()=>{
        return ""
      })
    }
  };

  return (
    <>
      <Header />

      <div className="flex justify-center h-20 items-center">
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyUp={saveNote}
          className="border border-blue-200 rounded w-3/4 p-1 box-border outline-none text-red-400 max-w-2xl"
        />
      </div>
      <div className="flex items-center flex-col">{notesJsx}</div>
    </>
  );
}
