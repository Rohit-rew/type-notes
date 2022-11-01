import React from 'react'
import {NotesContext} from "../src/context"

type NotePropType = {
    note : {
        text: string | undefined;
        striked: boolean;
    }
    index : number
    deleteNote : (val : number)=>void
}

export default function Note(props : NotePropType) {

    const data = React.useContext(NotesContext)

  const [checked, setchecked] = React.useState<boolean>(false);


  function strike(index : number){
    setchecked(val=>!val)

    data.dispatch({
        type : "STRIKE_NOTE",
        payload : {
            index,
            isstrike : !checked
        }
    })

  }

  return (
    <div className={`note w-2/4 text-left bg-blue-200 rounded shadow m-5 p-1 relative max-w-md ${props.note.striked ? "line-through" : ""}`}>
        <span onClick={(e)=>props.deleteNote(props.index)} className="absolute top-0 right-1 text-red-600 cursor-pointer">
          X
        </span>
        <span> <input onChange={()=>strike(props.index)}  type={"checkbox"}  checked={checked}/></span>
        {props.note.text}
      </div>
  )
}
