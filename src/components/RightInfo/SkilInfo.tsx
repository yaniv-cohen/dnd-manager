export const SkillInfo = (props: {titleDiv: any ,skill:{name:string,
    desc: string[], ability_score: any}}) => {
    console.log(props);
    
    return (
<ul>
{props.titleDiv}
{props.skill.desc.map(desc => <li>{desc}</li>)}
<li>{'Relevant stat: '+props.skill.ability_score.name}</li>
    </ul>
    )
}
export default SkillInfo


