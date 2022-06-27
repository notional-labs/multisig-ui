import SideBar from "./SideBar"
import FlexRow from "../flex_box/FlexRow"
import ContainerContent from "./CointainerContent"

const Container = ({ type, component, option = 0 }) => {
    return (
        <div
            style={{
                paddingTop: '13em',
                paddingLeft: '22em',
                paddingRight: '30em'
            }}
        >
            {
                type === 'dashboard' ? (
                    <FlexRow
                        components={[
                            <SideBar
                                option={option}
                            />,
                            <ContainerContent />
                        ]}
                        justifyContent={'start'}
                    />
                ) : (
                    <FlexRow
                        components={[
                            <SideBar
                                option={option}
                            />,
                            component
                        ]}
                        justifyContent={'start'}
                    />
                )
            }
        </div>
    )
}

export default Container