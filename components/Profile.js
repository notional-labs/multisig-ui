import { useMemo } from "react"
import FlexRow from "./flex_box/FlexRow"
import Button from "./input/Button"
import { addressShortener } from "../libs/stringConvert"
import { LogoutOutlined } from '@ant-design/icons';
import Image from "next/image"
import { Typography, Tooltip } from "antd"

const { Paragraph } = Typography;

const Profile = ({ account, chainName, setAccount }) => {

    const disconnect = () => {
        setAccount('')
        localStorage.removeItem('account')
    }

    const disconnectButton = (
        <Button
            text={(
                <Tooltip placement="bottom" title="Disconnect">
                    <LogoutOutlined />
                </Tooltip>
            )
            }
            clickFunction={disconnect}
            style={{
                border: 0,
                color: 'white',
                backgroundColor: 'transparent',
                fontSize: '1.5rem'
            }}
        />
    )

    const addressCol = () => {
        return (
            <FlexRow
                components={[
                    <text>
                        {chainName.toUpperCase()}
                    </text>,
                    <Paragraph
                        copyable={{ text: account[0].address }}
                        style={{
                            marginBottom: 0,
                            color: 'white',
                        }}
                    >
                        {addressShortener(account[0].address)}
                    </Paragraph>
                ]}
                direction={'column'}
            />
        )
    }    

    const profileBox = useMemo(() => {
        return (
            <div
                style={{
                    border: 'solid 2px white',
                    backgroundColor: 'transparent',
                    color: 'white',
                    borderRadius: '10px',
                    padding: '.5em 1em',
                    width: '300px',
                    margin: 'auto 0'
                }}
            >
                <FlexRow
                    components={[
                        <Image
                            src={'/images/avatar.png'}
                            width='40px'
                            height='40px'
                        />,
                        addressCol(),
                        disconnectButton
                    ]}
                    justifyContent={'space-between'}
                />
            </div>
        )
    }, [account])

    return account && account.length > 0 && (
       profileBox
    )
}

export default Profile