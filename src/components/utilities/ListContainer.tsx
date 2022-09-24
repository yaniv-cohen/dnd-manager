export const ListContainer = (props: { children: any }) => {
    return (<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' ,marginBottom:'25px'}}>
        {props.children}
    </div>)
}
    export default ListContainer