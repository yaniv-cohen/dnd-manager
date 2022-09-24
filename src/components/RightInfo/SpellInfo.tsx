export const SpellInfo = (props: {
    titleDiv: any, spell: {
        name: string, duration:string, material:string,
        desc: string[], subclasses: { url: string, name: string }[],
         level: number, range: string, school: {url:string, name: string }
    }
}) => {
    console.log(props);

    return (
        <div>
            {props.titleDiv}
            {props.spell.desc.map(desc => <p>{desc} </p>)}
            <p>{'Spell Level: ' + props.spell.level}</p>
            <p>{'Range: ' + props.spell.range}</p>
            <p>{'Spell Level: ' + props.spell.level}</p>
            <p><span onClick={() => { console.log(props.spell.school.url) }
            }>{'Magic School: ' + props.spell.school.name}</span>{props.spell.subclasses.map(sub => <span onClick={() => { console.log(sub.url) }
            }>{', ' + sub.name}</span>)}</p>
            <p>{'Duration: ' + props.spell.duration}</p>
            <p>{'Materials: '}{props.spell.material!==undefined?props.spell.material:'none'}</p>
        </div>
    )
}
export default SpellInfo


