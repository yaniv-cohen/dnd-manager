import { Button, List, ListItem } from "@mui/material";
import InfoCard from "../../../utilities/infoCard/InfoCard";
// import { ReactComponent as YourSvg } from './coat-of-arms/american-shield.svg';

import './BasicInfo.scss';
// import './coat-of-arms/american-shield.svg'
// import "./infoCard/InfoCard.scss"
// import "../../utilities/iconClasses.css"
export const BasicInfoCard = (props: {
    basicInfo: {
        name: string, race: string,
        title: string, class: string, level: number
    }, statsComponent: any
}) => {


    const YourSvg2 = require('./coat-of-arms/templar-shield.svg')
    console.log('svg ', YourSvg2)
    return (
        <InfoCard direction="col">
            {/* <div style={{ display:"block", width: '400px', height:'400px', backgroundPosition: 'center', backgroundImage: `url("./coat-of-arms/american-shield.svg")` }}> */}
            {/* <YourSvg/> */}
            {/* </div> */}

            <div className="InfoCardContainer">
            <div><h1 style={{    fontFamily: 'MedievalSharp', fontSize:"50px", fontWeight: "800"}}>{props.basicInfo.name}</h1>
                <h2 style={{    fontFamily: 'MedievalSharp'}}>{props.basicInfo.title}</h2>
                <div className="basicInfo">
                    <div>{props.basicInfo ?
                        (`level ${props.basicInfo.level} ${props.basicInfo.race} ${props.basicInfo.class}`) : ''}</div>
                    

                </div>
                </div>
                <div id="iconDiv" className={'a ' + props.basicInfo.class} ></div>
            </div >
    { props.statsComponent }


        </InfoCard >

    )
}
export default BasicInfoCard;