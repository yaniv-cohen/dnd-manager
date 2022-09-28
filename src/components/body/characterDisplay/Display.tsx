import { Box, Button, List, ListItem, Table, TableBody, TableCell, TableContainer, TableRow, Tooltip, Typography } from '@mui/material';
import axios from 'axios';
import { stringify } from 'querystring';
import React, { useEffect, useState } from 'react'
import SquareIcon from '@mui/icons-material/Square';
import createBagCardFromArray from './createBagCard';
import BasicInfoCard from './basicInfo/BasicInfoCard';
import createSpellsCard from './createSpellsCard';
import createSkillsCard from './createSkillsCard';
import StatsCard from './statsCard/createStatsCard';
import './Display.scss';
import RightInfo from '../../RightInfo/RightInfo';
import { NonNullExpression } from 'typescript';
import InfoCard from '../../utilities/infoCard/InfoCard';
import DefaultCharacterPage from './DefaultCharacterPage/DefaultCharacterPage';

export const Display = (props: { idFromSearch: number | null, setItemData: Function, setItemIndex: Function }) => {
    // const [charData, setCharData] = useState<{
    //     stats?: {}, bag?: {},
    //     id?: number, abilities?: {}
    // }>({});
    const [charJSX, setCharJSX] = useState<any>(null);
    const [displayedId, setDisplayedId] = useState<number | null>(null);
    const [inputId, setInputId] = useState<number | null>(props.idFromSearch);
    const [currentId, setCurrentId] = useState<number | null>(props.idFromSearch);
    const [basicInfo, setBasicInfo] = useState<any | null>();
    const [stats, setStats] = useState<{ unused: number, list: any } | null>();
    const [hp, setHp] = useState<{ current: number; max: number } | null>(null);
    const [armorScore, setaArmorScore] = useState<{ type: string; score: number } | null>(null);
    const [initiative, setInitiative] = useState<{ score: number } | null>(null);
    const [statsJSX, setStatsJSX] = useState<any>(<></>);
    const [skills, setSkills] = useState<any>();
    const [spells, setSpells] = useState<any>();
    const [skillsJSX, setSkillsJSX] = useState<any>(<></>);
    const [spellsJSX, setSpellsJSX] = useState<any>(<></>);
    const [bag, setBag] = useState<{}>({});
    const [itemInfo, setItemInfo] = useState<any>();
    const [bagJSX, setBagJSX] = useState<any>(<></>);

    useEffect(() => {
        setCurrentId(props.idFromSearch)
    }, [props.idFromSearch])

    useEffect(() => {
        if (currentId)
            handleGoPress(currentId);
    }, [currentId])


    useEffect(() => {
        if (stats != null) {

            // let jsx = Object.keys(stats.list).map((key) => {
            //     return {
            //         'name': key,
            //         'value': (stats.list[key as keyof typeof stats.list] + '')
            //     };
            // });
            let jsx = <StatsCard unused={stats.unused} list={stats.list}
                hp={hp} armorScore={armorScore} initiative={initiative}></StatsCard>
            // createStatsCard(stats.unused, stats.list, hp,
            //     armorScore, initiative);
            setStatsJSX(jsx);

        }

    }, [stats, hp, armorScore, initiative])

    useEffect(() => {
        // console.log('skills', skills);
        if (skills && skills.list != null) {

            // let jsx = skills.list.map((skill: { stat: string, name: string, score: number, url: string }) => {
            //     if (stats) {
            //         let statValue = Math.floor((stats.list[skill.stat] - 10) / 2);


            //         return <ListItem disablePadding className='skillsDiv'>{skill.name + ' : ' + skill.score + '  (' +
            //             (statValue > 0 ? '+' : '') + statValue + ') = ' + (skill.score + statValue)}</ListItem>;
            //     }
            // });
            // let njsx = <Box sx={{ width: '100%', maxWidth: 360 }}><List ><h1>Skills:</h1>{jsx}</List></Box>
            if (stats != null && stats != undefined) {
                let jsx = createSkillsCard(skills, stats, handleItemClick)
                setSkillsJSX(jsx);
            }
        }

    }, [skills])


    useEffect(() => {
        // console.log('spells', spells);
        if (spells && spells != null) {



            let jsx = createSpellsCard(handleItemClick, spells)
            setSpellsJSX(jsx);
        }

    }, [spells])


    useEffect(() => {

        let jsx = Object.keys(bag).map((key) => {
            return { 'name': key, 'quantity': (bag[key as keyof typeof bag] + '') };
        });

        let njsx = createBagCardFromArray(handleItemClick, jsx);
        setBagJSX(njsx);
    }, [bag])

    async function handleItemClick(type: string, index: string, inputUrl?: string) {
        console.log(index, inputUrl);

        let url;
        if (!inputUrl) {
            url = `https://www.dnd5eapi.co/api/${type}/${index}`

        }
        else {
            url = `https://www.dnd5eapi.co${inputUrl}`
        }
        const itemInfoFromApi = (((await axios.get(url)).data))
        props.setItemIndex(itemInfoFromApi.index)
        props.setItemData(itemInfoFromApi)
        console.log(itemInfoFromApi)
        setItemInfo(itemInfoFromApi)
    }
    function getCharacterSheet(id: string) {
        axios.get((process.env.PORT|| 'http://localhost:9000/id/') + id)
            .then(async function (response: any) {
                if (response.data) {
                    console.log(response.data);
                    setDisplayedId(response.data.id);
                    setBasicInfo(response.data.basicInfo);
                    setHp(response.data.hp);
                    setaArmorScore(response.data.armorScore);
                    setInitiative(response.data.initiative);
                    setStats(response.data.stats);
                    setSkills(response.data.skills);
                    setSpells(response.data.spells);
                    // setAbilities(response.data.abilities);
                    setBag(response.data.bag);
                }
            })
            .catch(function (error: Error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    const handleGoPress = (idToSearch: number) => {
        console.log('getting data for ', idToSearch);
        setCurrentId(idToSearch)
        if (idToSearch != null) {
            getCharacterSheet('' + idToSearch)
        }

    }
    const handleInputChange = (e: any) => {
        setInputId(e.target.value)
    }
    if (basicInfo) {
        return (


            <section>
                {/* <h1>{'current id ' + props.idFromSearch + ', and current is ' + currentId}</h1> */}
                <input onClick={()=>{setInputId(null) }} onChange={(e) => { handleInputChange(e) }} value={inputId ?? '' + props.idFromSearch} defaultValue={1}></input>
                <button style={{display:"inline-block"}} role="button" onClick={() => { if (inputId) handleGoPress(inputId) }}>Show character data</button>

                <br></br>
                <br></br>
                <br></br>
                <BasicInfoCard statsComponent={statsJSX} basicInfo={basicInfo}></BasicInfoCard>
                {/* <span>
                    {statsJSX}
                </span> */}
                <InfoCard >
                    <div className='cardsContainer'>
                        <span>
                            {skillsJSX}
                        </span>
                        <div>
                            <span>
                                {bagJSX}
                            </span>
                            <span>
                                {spellsJSX}
                            </span>
                        </div>
                        {/* <div>
                            <InfoCard>
                                <h1>Feats</h1>
                            </InfoCard>

                        </div> */}
                    </div>
                </InfoCard>

            </section>

        )
    }
    return (
        <section>
            <InfoCard classes="col">
            <DefaultCharacterPage>

            {/* <h1>{'current id ' + props.idFromSearch + ', and current is ' + currentId}</h1> */}
            <input onChange={(e) => { handleInputChange(e) }} value={inputId ?? '' + (props.idFromSearch??"Enter Character ID")} defaultValue={1}></input>
            <button onClick={() => { if (inputId) handleGoPress(inputId) }}>Show character data</button>
                <p>Welcome to the Dungeon Master's assistant tool!</p>
                <p>Search</p>
                <img height={"400px"} src="https://www.sheknows.com/wp-content/uploads/2018/08/asdwoiswwce8rsdascoj.jpeg?w=1259"/>
                </DefaultCharacterPage>
            </InfoCard>
        </section>
    )
}
export default Display


