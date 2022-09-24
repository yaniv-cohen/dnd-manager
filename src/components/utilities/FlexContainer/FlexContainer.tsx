
import './FlexContainer.scss';
export const FlexContainer = (props: {children: any}) => {
    return (
        <>
            <div className="sticky_flex">
                {props.children}
                </div>
        </>
    )
}

export default FlexContainer