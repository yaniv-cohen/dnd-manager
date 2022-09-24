export const EquipmentInfo = (props: { titleDiv: any ,equipment:any}) => {
    console.log(props);
    
    const irrelevantKeys =["index", "name","url"]
    const baseKeys =["equipment_category", "name","url"]
    
        return (
       <ul>
        {props.titleDiv}
        {
            //todo: this should be a function
            Object.keys(props.equipment).map((key) => {
                if (irrelevantKeys.includes(key) ) { return }
                let newLi = (['string', 'number'].includes(typeof props.equipment[key]) ?
                    <li>{key}: {props.equipment[key]}  </li> :
                    <li>{(Object.keys(props.equipment[key]).map(key2 => {
                        if (key2 === "index") { return }
                        return (['string', 'number'].includes(typeof props.equipment[key][key2]) ?
                            <> {key} {key2}: {props.equipment[key][key2]}</>
                            :
                            (
                                Object.keys(props.equipment[key][key2]).map(key3 => {
                                    // console.log(key3, data[key][key2][key3]);
                                    if (key3 === "index") { return }
                                    return <> {key} {key2} {key3}: {props.equipment[key][key2][key3]}</>
                                }
                                )
                            )
                        )
                    })
                    )}</li>
                )
                return newLi;
            })
        }
    </ul>
    )
}
export default EquipmentInfo


