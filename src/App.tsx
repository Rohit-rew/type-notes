import React from "react";
import Header from "./header";
import { NotesContext } from "./context";

export default function App() {
  const data = React.useContext(NotesContext);

  const [note, setNote] = React.useState<string>("");
  const [render, setrender] = React.useState<boolean>(false);

  const notesJsx = data.state.notes.map((note , i) => {
    return (
      <div key={i} className="note w-2/4 text-left bg-blue-200 rounded shadow m-5 p-1 relative max-w-md">
        <span onClick={(e)=>deletenote(i)} className="absolute top-0 right-1 text-red-600 cursor-pointer">
          X
        </span>
        {note.text}
      </div>
    );
  });

  const deletenote = (i:number)=>{
      data.dispatch({
        type : "DELETE_NOTE",
        payload : {index : i}
      })
      setrender(val=>!val)
  }

  console.log(data.state.notes)

  const saveNote = (e: React.KeyboardEvent):void => {
    if (e.key === "Enter") {
      console.log("yess")
      if (!note) return;
      data.dispatch({
        type: "ADD_NOTE",
        payload: {
          text: note,
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
