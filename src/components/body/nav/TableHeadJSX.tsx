import './Nav.scss';



export const TableHeadJSX_characters = (props: {setData:Function, sortBy: Function }) => {
    return (
    <tr className="headRow">
        <th onClick={() => props.sortBy('name', props.setData)}>Name</th>
        {/* <th onClick={() => props.sortBy('title', props.setData)}>Title</th> */}
        <th onClick={() => props.sortBy('class', props.setData)}>Class</th>
        {/* <th onClick={() => props.sortBy('class', props.setData)}></th> */}
        <th onClick={() => props.sortBy('race', props.setData)}>Race</th>
        <th onClick={() => props.sortBy('level', props.setData)}>Lvl.</th>
        <th onClick={() => props.sortBy('player', props.setData)}>Player</th>
        <th>Delete</th>
        {/* <th onClick={() => props.sortBy('id', props.setData)}>Id.</th> */}
        {/* <th onClick={() => props.sortBy('locationName', props.setData)}>Location</th> */}
        {/* <th onClick={() => props.sortBy('exp', props.setData)}>EXP.</th> */}
    </tr>)
}

export const TableHeadJSX_parties = (props: {setData:Function, sortBy: Function }) => {
    return (
    <tr className="headRow">
        <th onClick={() => props.sortBy('partyName', props.setData)}>Party Name</th>
        <th onClick={() => props.sortBy('gm', props.setData)}>Game Master</th>
        <th onClick={() => props.sortBy('charactersIds', props.setData)}>Size</th>
</tr>)
}

