import { motion } from "framer-motion"
import Button from "../input/Button"
import { Image } from "antd"


// Intro page
const IntroPage = () => {
    return (
        <div
            style={{
                backgroundImage: `url(/images/background.png)`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                minHeight: "100vh",
                textAlign: "center",
                padding: "1em 20em",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                overflowX: "hidden",
                overflowY: "hidden"
            }}
        >
            <div
                style={{
                    position: "relative",
                    zIndex: 1
                }}
            >
                <motion.div
                    initial={{
                        y: -60,
                        opacity: 0
                    }}
                    animate={{
                        y: 0,
                        opacity: 1
                    }}
                    exit={{ opacity: 0, y: -60 }}
                    transition={{ duration: .6 }}
                >
                    <Image
                        src={"/images/pink-logo.png"}
                        alt="logo"
                        height={"150px"}
                        preview={false}
                        style={{

                        }}
                    />
                </motion.div>
                <motion.div
                    initial={{
                        x: -60,
                        opacity: 0
                    }}
                    animate={{
                        x: 0,
                        opacity: 1
                    }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ duration: .6 }}
                    style={{
                        color: "#F195C6",
                        fontSize: "24px",
                        margin: "20px 0"
                    }}
                >
                    <text
                        style={{
                            color: "#F195C6",
                        }}
                    >
                        Create, sign and broadcast multisig transactions together!
                    </text>
                </motion.div>
                <motion.div
                    initial={{
                        scale: .95,
                    }}
                    animate={{
                        scale: 1
                    }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 2
                    }}
                    whileHover={{
                        color: "black"
                    }}
                >
                    <Button
                        text={"Enter The Tool"}
                        style={{
                            fontSize: "1.5rem",
                            padding: ".25em 2em",
                            borderRadius: "10px",
                            backgroundImage: "linear-gradient(92.29deg, #CCD1FF 0%, #EF96C5 100%)",
                            fontWeight: "bold",
                            color: "white",
                            border: 0,
                        }}
                        type={"link"}
                        url={"/multisigs"}
                        className={"gradient-button"}
                    />
                </motion.div>
            </div>
            <Button
                text={"View in github"}
                type={"a"}
                url={"https://github.com/notional-labs/multisig-ui"}
                style={{
                    border: 0,
                    backgroundColor: "black",
                    color: "white",
                    padding: ".5em 1em",
                    borderRadius: "10px",
                    fontSize: "1rem",
                    position: "absolute",
                    left: "85%",
                    top: "90%",
                    fontStyle: "italic",
                    textDecoration: "underline"
                }}
            />
            <style>{`
                .text-gradient {
                    marginBottom: 0;
                    background-color: #f907fc;
                    background-image: linear-gradient(315deg, #f907fc 0%, #05d6d9 74%);;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                ::-webkit-scrollbar {
                    width: 10px;
                    height: 5px;
                }
                
                /* Track */
                ::-webkit-scrollbar-track {
                    display: none;
                    background: transparent
                }
                
                /* Handle */
                ::-webkit-scrollbar-thumb {
                    background: #8f8f8f; 
                    border-radius: 10px;
                }
                
            `}</style>
        </div>
    )
}

export default IntroPage
