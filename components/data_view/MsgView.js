import FlexRow from "../flex_box/FlexRow"
import Button from "../input/Button"
import { CloseOutlined } from "@ant-design/icons"

const MsgView = ({ msg, removeMsg, index }) => {
    return (
        <FlexRow
            components={[
                <div>
                    {
                        msg.typeUrl
                    }
                </div>,
                <Button
                    text={(
                        <CloseOutlined />
                    )}
                    style={{
                        position: "relative",
                        top: "0px",
                        border: 0,
                        backgroundColor: "transparent",
                        fontWeight: "bold",
                        fontSize: ".75rem"
                    }}
                    clickFunction={() => removeMsg(index)}
                />
            ]}
            justifyContent="space-between"
            style={{
                backgroundColor: "#a6c8ff",
                border: "solid .5px #2d7cfa",
                padding: "1em",
                borderRadius: "10px",
                marginBottom: "2px"
            }}
        />
    )
}

export default MsgView