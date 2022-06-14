import SideBar from "./SideBar"
import FlexRow from "../flex_box/FlexRow"
import ContainerContent from "./CointainerContent"

const Container = () => {
    return (
        <div
            style={{
                paddingTop: '15em',
                paddingLeft: '25em',
                paddingRight: '25em'
            }}
        >
            <FlexRow
                components={[
                    <SideBar/>,
                    <ContainerContent/>
                ]}
                justifyContent={'start'}
            />
        </div>
    )
}

export default Container