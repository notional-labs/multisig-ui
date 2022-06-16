import SideBar from "./SideBar"
import FlexRow from "../flex_box/FlexRow"
import ContainerContent from "./CointainerContent"

const Container = ({ type, component }) => {
    return (
        <div
            style={{
                paddingTop: '15em',
                paddingLeft: '25em',
                paddingRight: '25em'
            }}
        >
            {
                type === 'dashboard' ? (
                    <FlexRow
                        components={[
                            <SideBar />,
                            <ContainerContent />
                        ]}
                        justifyContent={'start'}
                    />
                ) : (
                    component
                )
            }
        </div>
    )
}

export default Container