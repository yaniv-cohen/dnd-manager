import { Tooltip } from "@mui/material";
import axios from "axios"
import { handleSearch } from "../body/nav/Nav";
import { getCharactersByValue, getRequest } from "../server_requests/get_requests";
// import bard from '../../icons/class icons/bard.png';
import './iconClasses.css';
// ...later
// import {  Link ,useParams} from "react-router-dom";

function sendDeleteRequest(id: number, party: number) {
    let url =(process.env.PORT|| 'http://localhost:9000')+ `/${id}/${party}`
    console.log(url)
    axios.post(url)
        .then(async function (response: any
        ) {
            console.log('delete success response:');
            console.log(response.data);

        })
        .catch(function (error: Error) {
            console.log(error);
        })
    // .then(function () {
    //     // always executed
    // });
}
//new


export const createTableFromData = (tableBodyType: string | null | undefined, data: any, setTableBodyJSX: Function,
    setIdFromSearch: Function, limitForRequest: number, setData: Function, setTableBodyType: Function,
    setRules: Function, setCurrentPartyName: Function) => {




    if (tableBodyType === 'characters') {
console.log(data);

if(data){

        const JSX = data.map((character: any) => {
            return (

                <tr key={character.id + character.name}>
                    <Tooltip title={"Show " + character.name}>
                        <td onClick={() => { console.log(character.id); setIdFromSearch(character.id); }}>{character.name}</td>
                    </Tooltip>
                    {/* <td>{character.title}</div> */}
                    <td className="img_container" onClick={() => { getCharactersByValue(character.class, 'class', limitForRequest, setData) }}>
                        <div style={{ height: "50px", width: "50px" }}>
                            <div className={'a ' + character.class}></div>
                            

                        </div>
                        <div>{character.class}</div>
                    </td>
                    {/* <td onClick={() => { getCharactersByValue(character.class, 'class', limitForRequest, setData) }}>
                        <span>{character.class}</span>
                    </td> */}
                    <td onClick={() => { getCharactersByValue(character.race, 'race', limitForRequest, setData) }}>{character.race}</td>
                    <td onClick={() => { getCharactersByValue(character.level, 'level', limitForRequest, setData) }}>{character.level}</td>
                    <td onClick={() => { getCharactersByValue(character.player, 'player', limitForRequest, setData) }}>{character.player}</td>
                    {/* <td>{character.id}</div> */}
                    {/* <td onClick={() => { getCharactersByValue(character.locationName, 'locationName', limitForRequest, setData) }}>{character.locationName}</div> */}
                    {/* <td onClick={() => { getCharactersByValue(character.exp, 'locationName', limitForRequest, setData) }}>{character.exp}</div> */}
                    <td className="deleteButton" onClick={() => { sendDeleteRequest(character.id, character.partyId) }}>X</td>
                </tr >


            )
        })


        setTableBodyJSX(
            <>
                {JSX}
            </>);
}

    }
    else if (tableBodyType === 'parties') {
        console.log(data);
        if(data){
        const JSX = data.map((party: { partyName: string, partyId: number, charactersIds: string[] }) => {
            return (
                <tr key={party.partyId}>
                    <Tooltip title={"Show Party " + party.partyId}>
                        <td onClick={async () => {
                            console.log(party.partyId);
                            //  getCharactersByValue()
                            setCurrentPartyName(party.partyName)

                            handleSearch('id', party.charactersIds, limitForRequest, setTableBodyType, setData, setRules, setCurrentPartyName)
                        }}>{party.partyName}</td>
                    </Tooltip>
                    {/* <td>{
                        party.charactersIds.map(id => {
                            return <span onClick={async () => {
                                console.log({ id })
                                setCurrentPartyName(party.partyId)
                                if (party.charactersIds.length > 0) {
                                    handleSearchCharacter('id', [id], limitForRequest, setTableBodyType, setData, setRules, setCurrentPartyName)
                                }

                            }}>{id}  </span>
                        })
                    }</td> */}
                    <td>yaniv</td>
                    <td>
                        <span onClick={async () => {
                            // setCurrentPartyName(party.partyId)
                            setCurrentPartyName(party.partyName)
                            if (party.charactersIds.length > 0) {
                                handleSearch('id', party.charactersIds, limitForRequest, setTableBodyType, setData, setRules, setCurrentPartyName)
                            }

                        }}>Show Characters ({party.charactersIds.length})  </span>

                    </td>
                    <td onClick={()=>{console.log('add to party "'+ party.partyName+  '", of id' ,party.partyId)}}>
                        {/* <Link to="/createCharacter">+</Link> */}
                        +
                        </td>
                </tr >
            )
        })


        setTableBodyJSX(
            <>
                {JSX}
            </>);
        }
    }
}