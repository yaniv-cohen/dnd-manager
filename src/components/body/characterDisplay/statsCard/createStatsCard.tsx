import { List as div, ListItem } from "@mui/material";
import SquareIcon from '@mui/icons-material/Square';
import AddIcon from '@mui/icons-material/Add';
import InfoCard from "../../../utilities/infoCard/InfoCard";
import './statsCardStyle.scss';
export const CreateStatsCard = (props: {
    unused: number, list: { name: string, score: number, index: 'string' }[],
    hp: { current: number; max: number } | null,
    armorScore: { type: string; score: number } | null,
    initiative: { score: number } | null
}) => {

    if (!(props.list && props.armorScore && props.initiative && props.hp))
        return <></>;
    return (
        <InfoCard >

            {/* <div className="statsAndValue"> */}
                <div className='statsContainer'>
                    <h1>Stats:</h1>
                    {props.list.map(stat => {
                        const abilityScoreSpansArray = new Array(5);
                        let add = props.unused + 2;
                        for (let i = 0; i < abilityScoreSpansArray.length; i++) {
                            if (i < stat.score / 5) {
                                abilityScoreSpansArray[i] = (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{height: "30px;", width: "30px"}}><path d="M0 0h512v512H0z" fill="#f33b32" fill-opacity="1"/><g transform="translate(0,0)"><path d="M23.05 23.05V488.9H488.9V23.05zm17.9 17.9H471.1V471.1H40.95z" fill="#fff" fill-opacity="1"/></g></svg>)
                                // <SquareIcon key={i} color="primary" />;
                            }
                            else if (add) {
                                abilityScoreSpansArray[i] = <AddIcon className="clickable" key={i} sx={{ color: "#fff" }} />;
                                // abilityScoreSpansArray[i] = <div className="clickable" key={i}>+</div> ;
                                add = 0;
                            }
                            else {
                                abilityScoreSpansArray[i] = (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{height: "30px;", width: "30px"}}><path d="M0 0h512v512H0z" fill="#000" fill-opacity="1"/><g transform="translate(0,0)"><path d="M23.05 23.05V488.9H488.9V23.05zm17.9 17.9H471.1V471.1H40.95z" fill="#fff" fill-opacity="1"/></g></svg>)


                            }
                        }
                        return (
                            <li
                                key={stat.index}
                                className='spaced-li'>
                                <span className="stat-name">{stat.name}</span>
                                <span className="stat-value">
                                    <span >{stat.score < 10 ? '0'
                                        + stat.score : stat.score}

                                    </span>
                                    <span style={{ marginLeft:'10px', display:'flex', flexDirection:'row', gap:'2px'}}>
                                    {abilityScoreSpansArray}
                                    </span>
                                </span>
                            </li>
                        );
                    })
                    }
                    <li>Unused: {props.unused+1}</li>
                </div >
                <div className="valuesContainer">
                    <div className="bordered_div">
                        <div className="icon_with_text">
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '120px' }} className="left">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ height: "35px", width: "35px" }}><path d="M0 0h512v512H0z" fill="#000" fillOpacity="1" /><g transform="translate(0,0)"><path d="M196 16a30 30 0 0 0-30 30v120H46a30 30 0 0 0-30 30v120a30 30 0 0 0 30 30h120v120a30 30 0 0 0 30 30h120a30 30 0 0 0 30-30V346h120a30 30 0 0 0 30-30V196a30 30 0 0 0-30-30H346V46a30 30 0 0 0-30-30H196z" fill="#fff" fillOpacity="1" /></g></svg>
                                </div>
                                <div>HP:</div>
                            </div>
                            <div>{props.hp.current}/{props.hp.max}</div>
                        </div>
                    </div>
                    <div className="bordered_div">
                        <div className="icon_with_text">
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '120px' }} className="left">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ height: "40px", width: "40px" }}><path d="M0 0h512v512H0z" fill="#000" fillOpacity="1" />
                                        <g ><path d="M158.094 75.156c-20.642 13.654-46.023 22.503-69.438 26.03 6.792 48.935 26.14 84.133 45.97 97.845 10.523 7.28 20.357 9.012 30.405 5.564 8.93-3.064 18.63-10.97 27.75-25.594-26.933-30.227-31.606-71.05-34.686-103.844zM355 75.25c-3.08 32.79-7.787 73.58-34.72 103.78 9.117 14.61 18.857 22.5 27.783 25.564 10.047 3.448 19.85 1.715 30.375-5.563 19.8-13.693 39.12-48.822 45.937-97.655-24.495-3.17-47.802-11.35-69.375-26.125zm-98.5 12.97c-31.2 0-58.752 6.99-75.47 17.655.988 5.463 2.15 10.912 3.564 16.25 16.138-6.942 42.334-11.47 71.937-11.47 29.604 0 55.8 4.528 71.94 11.47 1.412-5.338 2.575-10.787 3.56-16.25C315.31 95.203 287.716 88.22 256.5 88.22zM75.406 132.374l-47.72 45.47c29.75 37.184 63.04 56.826 86.47 58.718 1.145.092 2.253.135 3.344.156 1.792-7.583 3.963-15.05 6.5-22.345-21.724-15.023-39.014-43.736-48.594-82zm362.25 0c-9.59 38.26-26.87 66.978-48.594 82-.03.022-.062.04-.093.063 2.54 7.276 4.728 14.72 6.53 22.28 1.11-.02 2.24-.06 3.406-.155 23.434-1.892 56.75-21.525 86.5-58.72l-47.75-45.468zm-245 12.47c4.54 9.7 10.45 18.604 18.25 26.155l5.125 4.97-3.436 6.218c-1.8 3.292-3.672 6.388-5.594 9.312 32.592 11.965 67.862 11.136 98.938-.188-1.88-2.868-3.707-5.902-5.47-9.125l-3.406-6.218 5.094-4.97c7.53-7.29 13.308-15.846 17.78-25.156-43.627 10.534-85.4 8.503-127.28-1zm125.5 61.81c-38.403 15.68-83.03 16.82-123.406.157-7.3 7.37-15.218 12.574-23.656 15.47-9.922 3.404-20.24 3.312-30.063.374-6.907 20.592-10.78 42.597-10.78 64.406 0 7.314.562 14.825 1.656 22.47l122.406-29.907 2.22-.563 2.218.563 122.75 29.97c.886-7.647 1.344-15.173 1.344-22.533 0-21.79-3.89-43.792-10.844-64.375-9.812 2.928-20.122 2.995-30.03-.406-8.5-2.915-16.472-8.172-23.814-15.624zm158.47 8.564c-25.404 24.168-52.068 38.018-76.22 39.968-.427.034-.855.036-1.28.062 1.214 8.075 1.99 16.228 2.28 24.406 22.806 3.78 54.723.098 90-14.344l-14.78-50.093zm-440.188.03l-14.75 50.063c35.268 14.433 67.17 18.12 89.968 14.343.29-8.18 1.076-16.33 2.28-24.406-.425-.026-.852-.028-1.28-.063-24.146-1.95-50.82-15.777-76.22-39.937zm220.093 83.063l-121.06 29.593c1.972 8.128 4.51 16.35 7.5 24.625 33.536-7.734 71.23-11.506 108.5-11.78 2.784-.02 5.564-.018 8.343 0 40.257.264 79.61 4.576 112.28 12.25 2.622-8.343 4.8-16.65 6.47-24.875L256.53 298.312zm-4.905 61.406c-35.09.24-70.5 3.556-101.625 10.405 3.586 8.164 7.618 16.326 12.03 24.438 28.365-2.455 59.055-3.677 89.47-3.782 2.763-.008 5.525-.007 8.28 0 33.542.107 66.446 1.56 95.22 4.158 4.04-8.015 7.635-16.103 10.813-24.188-32.65-7.392-73.185-11.312-114.188-11.03zm-.063 49.81c-26.842.09-53.864 1.036-79.125 2.94 5.517 8.88 11.473 17.652 17.813 26.217 4.832 1.102 13.818 2.332 25.344 3.032 13.2.8 29.062 1.137 44.812 1.06 15.75-.074 31.41-.565 44.22-1.405 10.923-.716 19.234-1.848 23.468-2.72 6.205-8.426 11.88-17.067 17.062-25.81-28.492-2.267-60.905-3.422-93.594-3.314z" fill="#fff" fillOpacity="1" /></g></svg>
                                </div>
                                <div style={{ textAlign: "end" }}>Armor Score:</div>
                            </div>
                            <div style={{ textAlign: "end" }}>{props.armorScore.score} {props.armorScore.type}</div>
                        </div>
                    </div>

                    <div className="bordered_div">
                        <div className="icon_with_text">
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '120px' }} className="left">
                                <div >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ height: "40px", width: "40px" }}><path d="M0 0h512v512H0z" fill="#000" fillOpacity="1" /><g transform="translate(0,0)" ><path d="M182.4 89.85c-60.9-.06-118.49 21.35-161.74 66.05v28.3C70.62 121 146.3 98.56 225.6 112.3c-76.8-.7-151.72 30.3-204.94 93.4v30.6C70.71 164.8 146.8 129.9 225.4 130.8 127.5 152.7 55.35 209.6 21.97 287 83.23 356.4 186.2 404.9 269.4 419.2c81.5 13 164 2.3 225.5-37.6v-22.7c-57.1 42.1-139.7 55-222.5 41.8-9.3-1.4-18.6-3.3-27.9-5.4 90.4 10.6 183.5-8.2 250.4-59.7v-24.2c-45.2 39.6-107.3 61.3-173 66.3 55.1-13.2 110.3-41.8 164.7-85.1l7-5.6c-13.5-18.4-28.5-37.4-41.9-52.3C392.7 159.5 315.6 112 239 95.88c-16.7-3.51-33.4-5.5-49.9-5.94-2.3 0-4.7-.1-6.7-.1zm78.9 48.45c7.3 8.6 13.3 18 18.3 27.9-13 4.9-22.3 17.5-22.3 32.2 0 19 15.4 34.4 34.4 34.4 2 0 3.9-.2 5.8-.5 4.9 54.4-10.4 111.3-36.2 145.4-43.7-59.2-50.7-172.4 0-239.4zm-46 13.2c-41.6 17.8-70.8 59.2-70.8 107.4 0 46.5 27 86.6 66.3 105.4-44.1-6.8-87.5-24.7-129.93-54.2-7.73-22.9-9.04-45.8-2.83-68.8 41.96-49.5 88.66-79.8 137.26-89.8zm117.2 14.8c34.6 15.7 69.3 41.7 103.4 79 5.1 20.8 4.2 41.5-2 62.3-37.1 24.2-74.1 41-110.7 50.5 33-20.6 55-57.3 55-99.2-4.7-37.1-21.4-73.3-45.7-92.6z" fill="#fff" fillOpacity="1" /></g></svg>
                                </div>
                                <div>Initiative:</div>
                            </div>
                            <div>{props.initiative.score > 0 ?
                                '+' + props.initiative.score : props.initiative.score
                            }</div>
                        </div>
                    </div>




                </div>
            {/* </div> */}
        </InfoCard>
    )
}
export default CreateStatsCard;