// import { ThemeContext } from "../../App";

import React, { useContext, useState, useEffect } from 'react'
import Display from './characterDisplay/Display';
import Nav from './nav/Nav';
import '../utilities/iconClasses.css';
import RightInfo from '../RightInfo/RightInfo';
import './Main.scss';
import FlexContainer from '../utilities/FlexContainer/FlexContainer';
// import Theme from '../../types/theme'
export function Main() {
    // const things =  React.useContext(ThemeContext);
    const [idFromSearch, setIdFromSearch] = useState<number | null>(null);
    const [showNav, setShowNav] = useState<boolean>(false);
    const [itemIndex, setItemIndex] = useState<string>('dagger of killing');
    const [itemData, setItemData] = useState<any>(null);
    const [displayMode, setDisplayMode] = useState<string>('showCharacter')

    useEffect(() => {
        console.log(`change itemIndex to ${itemIndex}`);

    }, [itemIndex])


    return (

        <main>
            <img id="background_image" src="https://static.wixstatic.com/media/c91840_32d61b2f5bc2412996c7fbeb31c18024f000.jpg/v1/fill/w_1810,h_1080,al_c,q_85,usm_0.33_1.00_0.00,enc_auto/c91840_32d61b2f5bc2412996c7fbeb31c18024f000.jpg" alt="" />

            <FlexContainer>
                <Nav showNav={showNav} setIdFromSearch={setIdFromSearch}></Nav>
            </FlexContainer>
            {<Display setItemData={setItemData} setItemIndex={setItemIndex} idFromSearch={idFromSearch} />}
            <FlexContainer>
                <RightInfo itemData={itemData} itemIndex={itemIndex}></RightInfo>
            </FlexContainer>
            {/* <Map></Map> */}
        </main>



    )

}

export default Main;