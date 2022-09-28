// import { ThemeContext } from "../../App";

import { Button, ButtonGroup } from '@mui/material';
import { red } from '@mui/material/colors';
import { maxWidth } from '@mui/system';
import { ResponseType } from 'axios';
import { log } from 'console';
import React, { useContext, useEffect, useState } from 'react'
import { getRequest } from '../../server_requests/get_requests';
import { createSelectionFromRules } from '../../utilities/createSelectionFromRules';
import { createTableFromData } from '../../utilities/createTableFromData';
import AddCharacterSelection from '../AddCharacterSelection';
import InfoCard from '../../utilities/infoCard/InfoCard';
import './Nav.scss'
// import { TableHeadJSX_characters, TableHeadJSX_locations } from './TableHeadJSX_characters';
import { TableHeadJSX_parties as TableHeadJSX_parties, TableHeadJSX_characters } from './TableHeadJSX';
const axios = require('axios').default;
// import Theme from '../../types/theme'
export function Nav(props: { showNav?: boolean, setIdFromSearch?: Function }) {
    // const things =  React.useContext(ThemeContext);
    let sortType = 'name';
    let sortDirection = 1;
    const [visible, setVisible] = useState<boolean>(props.showNav??true);
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchType, setSearchType] = useState<string>('id');
    const [currentPartyName, setCurrentPartyName] = useState<string | null>();
    const [limitForRequest, setLimitForRequest] = useState<number>(10);
    const [tableBodyJSX, setTableBodyJSX] = useState(<></>);
    const [tableBodyType, setTableBodyType] = useState<'parties' | 'locations' | 'characters' | null>();
    const [rules, setRules] = useState<{
        classes?: string[], races?: string[], minimum_level?: number,
        maximum_level?: number, starting_town?: string,
        rules_set_number?: number
    }>({});
    const [selectionJSX, setSelectionJSX] = useState(<></>);
    const handleLimitRangeChange = (e: any) => {
        setLimitForRequest(e.target.value);
    }


    useEffect(() => {
        if (tableBodyType === 'characters')
            setTableHeadJSX(tableHeadJSX_characters);

        else if (tableBodyType === 'parties') {
            console.log(tableBodyType)
            setTableHeadJSX(tableHeadJSX_parties);
        }
    }, [tableBodyType])

    const handleAddCharacter = async () => {
        const rules = await getRequest('rules', limitForRequest, setTableBodyType, setData, setRules, setCurrentPartyName)
        console.log(rules);
    }


    const NavButtons =
        <div>
            <button role="button" onClick={() => setVisible(false)}>{'<'}</button>
            <button role="button" onClick={() => getRequest('get_characters', limitForRequest, setTableBodyType, setData, setRules, setCurrentPartyName)}><span className="text">Show Players</span></button>
            <button role="button" onClick={() => getRequest('get_parties', limitForRequest, setTableBodyType, setData, setRules, setCurrentPartyName)}><span className="text">Show Parties</span></button>
        </div>

    const [data, setData] = useState<Array<
        {
            'name': string, 'title': string,
            'id': string, 'class': string, 'level': number, 'exp': number,
            'locationName': string, 'race': string, 'player': string
        } |
        {
            '_id': string, 'partyName': String, 'partyId': number, 'charactersIds': number[]
        }[]

    >>([]);





    const sortBy = (
        // type: keyof data
        // type : as keyof data
        type: 'name' | 'title' | 'id' | 'class' | 'level' | 'exp'
            | 'race' | 'player' | 'partyName' | 'charactersIds' | 'partyId'
        , setData: Function) => {
        console.log(data.length, type, sortType, sortDirection);
        if (sortType === type) {
            sortDirection = (-1 * sortDirection)
        }
        sortType = type;
        console.log(data.length, type, sortType, sortDirection);
        if (data.length > 1) {
            let sortedData = data.sort((a, b) => {
                //@ts-ignore

                if (type === "level" && "level" in a && "level" in b) {
                    return a["level"] > b["level"] ? sortDirection * 1 : (
                        a["level"] == b["level"] ?
                            (a["name"] > b["name"] ? sortDirection * 1 : sortDirection * (-1))
                            : sortDirection * (-1));

                }
                else if (type === "exp" && "exp" in a && "exp" in b) {
                    return a["exp"] > b["exp"] ? sortDirection * 1 : (
                        a["exp"] === b["exp"] ?
                            (a["name"] > b["name"] ? sortDirection * 1 : sortDirection * (-1))
                            : sortDirection * (-1));

                }
                else if (type === "id" && "id" in a && "id" in b) {
                    return a["id"] > b["id"] ? sortDirection * 1 : (
                        a["id"] == b["id"] ?
                            (a["name"] > b["name"] ? sortDirection * 1 : sortDirection * (-1))
                            : sortDirection * (-1));

                }
                //@ts-ignore
                else if (type in a && type in b && b[type]) {
                    //@ts-ignore

                    return a[type] ?? "0" > b[type] ?? '0' ? sortDirection * 1 : (
                        //@ts-ignore

                        (a[type] == b[type] ?
                            //@ts-ignore

                            (a["name"] > b["name"] ? sortDirection * 1 : sortDirection * -1)
                            : sortDirection * (-1))
                    )
                }
                else return 0;
            });

            setData([...sortedData]);
        }
        console.log('update data command', data);

        // setTableInside(sorted)
    }
    const tableHeadJSX_characters = <TableHeadJSX_characters setData={setData} sortBy={sortBy}></TableHeadJSX_characters>
    const tableHeadJSX_parties = <TableHeadJSX_parties setData={setData} sortBy={sortBy}></TableHeadJSX_parties>
    const [tableHeadJSX, setTableHeadJSX] = useState(tableHeadJSX_characters);
    // const createTableFromData = (data: any) => {
    //     createTableFromData(data, setTableBodyJSX, getCharactersByValue)
    // }

    const visibleJSX =
        <>

            {NavButtons}

            <InfoCard direction="col">
            {tableBodyType==="characters"?(currentPartyName?<p>{currentPartyName}</p>:<></>):<></>}

                <table>
                    {tableHeadJSX}
                    {tableBodyJSX}
                </table>
                <input onChange={handleLimitRangeChange} value={limitForRequest} type="range" id="limitItemRange" name="limitItemRange" min="0" max="30" />
                <div>{limitForRequest}</div>
                {/* /add  new character */}
                {
                tableBodyType === 'parties'?
(
                <div className='addContainer'>
                                        <div>
                        <input value={searchValue} onChange={(e) => {  setSearchType('partyName'); setSearchValue(e.target.value) }} type="text" placeholder="search for Party Name"></input>
                        <button onClick={() => { handleSearch(searchType, [searchValue], limitForRequest, setTableBodyType, setData, setRules, setCurrentPartyName) }}>search Character</button>
                    </div>
                    <button style={{ width: "240px" }} role="button" onClick={handleAddCharacter}>Add Character</button>

                    {selectionJSX}
                </div>):  
                    //                                   <div>
                    //     <input value={searchType} onChange={(e) => { setSearchType(e.target.value) }} type="text" placeholder="Search for id"></input>
                    //     <input value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} type="text" placeholder="Search for id"></input>
                    //     <button onClick={() => { handleSearch(searchType, [searchValue], limitForRequest, setTableBodyType, setData, setRules, setCurrentPartyName) }}>search Character</button>
                    // </div> 
                    <></>
            }

            </InfoCard>
        </>
    useEffect(() => {
        console.log('data was changed');
        createTableFromData(tableBodyType, data, setTableBodyJSX,
            props.setIdFromSearch??console.log, limitForRequest, setData, setTableBodyType, setRules, setCurrentPartyName)
    }, [data])

    useEffect(() => {
        if (rules.rules_set_number) {
            createSelectionFromRules(rules, setSelectionJSX);
        }
        // console.log(selectionJSX);

    }, [rules])

    //called when user clicks on a table cell
    const getCharactersByValue = async (value: string, type: string) => {
        const url = (window.location.origin + `/${type}` +
            '/' + value + '/' + limitForRequest);
        console.log(url);
        let response = await (await fetch(url)).json();
        setData(response);
    }
    // if (visible)
    //     return (
    //         <div className='container' >
    //             {visibleJSX}
    //         </div>
    //     )
    return (
        <div className='navContainer'>
            {visible ? visibleJSX : <button role="button" onClick={() => setVisible(!visible)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ height: '50px', width: '50px' }}><path d="M0 0h512v512H0z" fill="#000" fillOpacity="0.4" /><g transform="translate(0,0)" ><path d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z" fill="#fff" fillOpacity="1" /></g></svg></button>}
        </div>
    )

}

export default Nav;


export const handleSearch = async (searchType: string, searchValue: string|string[], limitForRequest: number
    , setTableBodyType: Function, setData: Function, setRules: Function, setCurrentPartyName: Function) => {
        if(searchType=== 'partyName' )
        {
            
            const url = 'search_party/' + searchType + '/' + (searchValue+'').replace("'", '1234').replace(' ', '-')
            console.log('search for party',url );

            const output = await getRequest(url, limitForRequest, setTableBodyType, setData, setRules, setCurrentPartyName)
            console.log(output);
        
        }
        else{
            const url = 'search_character/' + searchType + '/' + searchValue
            console.log(url);
            const output = await getRequest(url, limitForRequest, setTableBodyType, setData, setRules, setCurrentPartyName)
            console.log(output);
        
        }

}