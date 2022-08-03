import MsgView from "../data_view/MsgView"

const MsgList = ({ msgs, removeMsg }) => {
    return (
        <div
            style={{
                width: '100%'
            }}
        >
            {
                msgs.length > 0 ? msgs.map((msg, index) => {
                    return (
                        <div
                            key={index}
                        >
                            <MsgView
                                msg={msg}
                                removeMsg={removeMsg}
                                index={index}
                            />
                        </div>
                    )
                }) : (
                    <div
                        style={{
                            backgroundColor: "#a6c8ff",
                            border: "solid .5px #2d7cfa",
                            padding: "1em",
                            color: "#2d7cfa",
                            borderRadius: "10px"
                        }}
                    >
                        No message yet!
                    </div>
                )
            }
        </div>
    )
}

export default MsgList