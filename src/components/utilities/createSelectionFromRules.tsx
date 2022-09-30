import { Box, Button, Card, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios"
import { stringify } from "querystring";
import { useEffect, useState } from "react";
import SelectorFromArray from "./SelectorFromArray";

function sendAddRequest(id: number) {
    let url = window.location.origin +'/'+ id
    console.log(url)
    axios.post(url)
        .then(async function (response: any
        ) {
            console.log('create_character success response:');
            console.log(response.data);

        })
        .catch(function (error: Error) {
            console.log(error);
        })
    // .then(function () {
    //     // always executed
    // });
}

export const createSelectionFromRules = (rules: any, setSelectionJSX: Function) => {
    let jsx;
    const outputCharacter: {
        name?: String, title?: String,
        class?: String, race?: String, level?: number, id?: number,
        player?: String, location?: String, locationName: String, exp?: number
    } = { locationName: '' + rules.starting_town };


    const setData = (type: string, value: string) => {

        console.log(type, value, Object.hasOwn(outputCharacter, type));

        //@ts-ignore
        outputCharacter[type] = value;
        console.log(outputCharacter);

    }

    //
    const submitCharacter = () => {
        console.log('submit:', outputCharacter);
        axios.post(window.location.origin +'/create_character', {
            data: {
                newCharacter: outputCharacter
            }
        })
            .then(function (response: any
            ) {
                console.log(response)
            })
            .catch(function (error: Error) {
                console.log(error);
            })
            .then(function () {
                // always executed

            });
    }
    console.log('rules ', Object(rules));
    setSelectionJSX(
        <Card>
            {/* <input onChange={(e) => { outputCharacter.name = e.target.value }} type='text' placeholder='Enter Name'></input> */}
            <TextField id="outlined-basic" label="Name" variant="outlined" onChange={(e) => { outputCharacter.name = e.target.value }}
                placeholder='' />
            {/* <input onChange={(e) => { outputCharacter.title = e.target.value }}
                type='text' placeholder='Enter Title'></input> */}
            <TextField id="outlined-basic" label="Title" variant="outlined" onChange={(e) => { outputCharacter.title = e.target.value }}
                placeholder='' />
            {
                SelectorFromArray('class', rules.classes ?? [], setData)
            }

            {
                SelectorFromArray('race', rules.races ?? [], setData)
            }
            {/* <input onChange={(e) => { outputCharacter.exp = parseInt(e.target.value) }} min={0} max={1000000}
                type='number' placeholder='Enter Exp'></input> */}
            <TextField id="outlined-basic" label="EXP." variant="outlined" onChange={(e) => { outputCharacter.exp = Math.min(Math.max(parseInt(e.target.value), 0), 10000) }}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} placeholder='Enter Exp' />
            {/* <input onChange={(e) => { outputCharacter.level = parseInt(e.target.value) }} min={parseInt(rules.minimun_level)} max={parseInt(rules.maximum_level)}
                type='number' placeholder='Enter Level'></input> */}
            <TextField id="outlined-basic" label="Level" variant="outlined" onChange={(e) => { outputCharacter.level = Math.min(Math.max(parseInt(e.target.value), 0), 30) }}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} placeholder='Enter Exp' />
            {/* <input onChange={(e) => { outputCharacter.player = e.target.value }} type='text' placeholder='Enter Player'></input> */}
            <TextField id="outlined-basic" label="Player Name" variant="outlined" onChange={(e) => { outputCharacter.player = e.target.value }}
                placeholder='' />
            <TextField disabled value={outputCharacter.locationName} id="outlined-basic" label="Starting Location" variant="filled" onChange={(e) => { outputCharacter.locationName = e.target.value }}
                placeholder='' />
            <TextField disabled id="outlined-basic" label="ID" variant="outlined"
             onChange={(e) => { outputCharacter.id = Math.max(parseInt(e.target.value), 0) }}
                value={Math.floor(Math.random()*100000)} />
            <Button onClick={submitCharacter} variant="contained">Create</Button>
        </Card>
    );
    //     setSelectionJSX(
    //                 <div>
    //     <FormControl fullWidth>
    //     <InputLabel id="demo-simple-select-label">Age</InputLabel>
    //     <Select
    //       labelId="demo-simple-select-label"
    //       id="demo-simple-select"
    //       value={class}
    //       label="Age"
    //       onChange={handleChange}
    //     >
    //       <MenuItem value={10}>Ten</MenuItem>
    //       <MenuItem value={20}>Twenty</MenuItem>
    //       <MenuItem value={30}>Thirty</MenuItem>
    //     </Select>
    //   </FormControl>
    //         </div>

    //     );



}