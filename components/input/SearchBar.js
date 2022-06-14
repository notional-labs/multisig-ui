import { Input } from "antd"
import FlexRow from "../flex_box/FlexRow"
import Button from "./Button"
import {SearchOutlined} from '@ant-design/icons'

const SearchBar = ({ }) => {
    return (
        <FlexRow
            components={[
                <Input
                    style={{
                        borderRadius: '10px 0 0 10px',
                        backgroundColor: 'transparent',
                        border: 'solid 2px white',
                        borderRight: 0,
                        color: 'white',
                        height: '100%',
                        margin: 'auto 0',
                        width: '500px',
                        fontSize: '1.25rem'
                    }}
                    placeholder={'Search multisig'}
                />,
                <Button 
                    text={
                        <SearchOutlined />
                    }
                    style={{
                        backgroundColor: 'transparent',
                        border: 'solid 2px white',
                        borderLeft: 0,
                        borderRadius: '0 10px 10px 0',
                        fontSize: '1.5rem',
                    }}
                />
            ]}
            style={{
                // padding: '.25em 10px .25em 0'
                marginRight: '20px'
            }}
        />
    )
}

export default SearchBar