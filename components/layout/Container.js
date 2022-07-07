import SideBar from "./SideBar"
import FlexRow from "../flex_box/FlexRow"
import ContainerContent from "./CointainerContent"
import { motion } from "framer-motion"

const Container = ({ component, option = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: .6 }}
            className="page-container"
            style={{
                paddingTop: '90px',
            }}
        >
            {
                <>
                    <SideBar
                        option={option}
                    />,
                    <div
                        style={{
                            marginTop: '6em',
                            padding: '0 30em',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}
                    >
                        {component}
                    </div>
                </>
            }
        </motion.div>
    )
}

export default Container