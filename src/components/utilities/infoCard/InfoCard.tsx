import { useState } from 'react'
import { parentPort } from 'worker_threads'
import './InfoCard.scss'
// import '../../../utilities/iconClasses.css';

export const InfoCard = (props: any) => {
    let divClasses = 'infoCard'
    if (props.classes) {
        divClasses += ' ' + props.classes
    }

    return (
        <div className={divClasses + ' ' + props.direction} >
            {props.children}

        </div>
    )
}
export default InfoCard;