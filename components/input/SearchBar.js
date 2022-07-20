import { Input } from "antd"
import FlexRow from "../flex_box/FlexRow"
import Button from "./Button"
import { SearchOutlined } from "@ant-design/icons"

const SearchBar = () => {
    return (
        <FlexRow
            components={[
                <Input
                    style={{
                        borderRadius: "10px",
                        backgroundColor: "transparent",
                        color: "black",
                        width: "400px",
                        fontSize: "1rem",
                    }}
                    placeholder={"Search multisig"}
                    allowClear={true}
                    suffix={(
                        <Button
                            text={
                                <SearchOutlined />
                            }
                            style={{
                                backgroundColor: "transparent",
                                border: 0,
                            }}
                        />
                    )}
                />,
            ]}
            style={{
                marginRight: "20px",
                backgroundColor: "white",
                borderRadius: "10px",
                height: "48px",
            }}
        />
    )
}

export default SearchBar