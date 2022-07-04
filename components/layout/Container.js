import SideBar from "./SideBar"
import FlexRow from "../flex_box/FlexRow"
import ContainerContent from "./CointainerContent"

const Container = ({ type, component, option = 0 }) => {
    return (
        <div
            style={{
                paddingTop: '90px'
            }}
        >
            {
                type === 'dashboard' ? (
                    <>
                        <SideBar
                            option={option}
                        />,
                        <ContainerContent />
                    </>
                ) : (
                    <>
                        <SideBar
                            option={option}
                        />,
                        <div
                            style={{
                                marginTop: '7em',
                                padding: '0 30em'
                            }}
                        >
                            {component}
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default Container