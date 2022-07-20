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
        window.dispatchEvent(new Event('storage'))
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
                    <text
                    >
                        {chainName.toUpperCase()}
                    </text>,
                    <Paragraph
                        copyable={{ text: account.bech32Address }}
                        style={{
                            marginBottom: 0,
                            color: 'white',
                            fontSize: '.75rem'
                        }}
                    >
                        {addressShortener(account.bech32Address)}
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
                    border: 'solid 1px white',
                    backgroundColor: 'transparent',
                    color: 'white',
                    borderRadius: '10px',
                    padding: '.25em 1em',
                    width: '280px',
                    margin: 'auto 0'
                }}
            >
                <FlexRow
                    components={[
                        <div
                            style={{
                                position: 'relative',
                                top: '3px'
                            }}
                        >
                            <Image
                                src={'/images/avatar.png'}
                                width='35px'
                                height='35px'
                            />
                        </div>,
                        addressCol(),
                        disconnectButton
                    ]}
                    justifyContent={'space-between'}
                />
            </div>
        )
    }, [account])

    return account && (
        profileBox
    )
}

export default Profile