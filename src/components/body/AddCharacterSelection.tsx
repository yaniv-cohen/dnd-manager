// import { ThemeContext } from "../../App";

import React, { useContext } from 'react'
// import Theme from '../../types/theme'
export function AddCharacterSelection(props: {type:string , arr:any}) {
    // const things =  React.useContext(ThemeContext);
    const mainStyles = {

    }
const handleChange = ()=>{
    console.log('hi change');
    
}

    return (
        <select onChange={handleChange} name={props.type} id={props.type +"-select"}>
        {props.arr.map((option:any, index:any) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>


    )

}

export default AddCharacterSelection;