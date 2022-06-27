import FlexRow from "./flex_box/FlexRow"
import SelectChain from "./input/SelectChain"
import Image from "next/image"
import { ChainContext } from "./Context"
import Account from "./layout/Account"
import { useContext } from "react"
import { Input } from "antd"
import SearchBar from "./input/SearchBar"
import '../styles/Header.module.css'
import Link from "next/link"

const logo = (
    <FlexRow
        components={[
            (<Link
                href={'/'}
                style={{
                    cursor: 'pointer'
                }}
            >
                <Image
                    src='/images/logo.png'
                    width={'60px'}
                    height={'50px'}
                />
            </Link>),
            (
                <text
                    style={{
                        fontSize: '2rem',
                        margin: 'auto 10px auto'
                    }}
                >
                    MULTISIG
                </text>
            )
        ]}
        justifyContent={'space-between'}
    />
)

const Header = ({ enableSelectChain }) => {
    const { chain } = useContext(ChainContext)

    console.log(chain)

    return (
        <div
            className="header"
            style={{
                backgroundImage: `${chain.color}`,
                color: '#ffffff',
                padding: '1em 5em',
                position: 'fixed',
                height: '90px',
                width: '100%',
                zIndex: 2
            }}
        >
            <FlexRow
                components={[
                    logo,
                    <FlexRow
                        components={[
                            <SearchBar />,
                            <SelectChain
                                enableSelectChain={enableSelectChain}
                            />,
                        ]}
                        justifyContent={'space-between'}
                    />,
                    <Account
                        chainId={chain.chain_id}
                        chainName={chain.name}
                    />
                ]}
                justifyContent={'space-between'}
            />
        </div>
    )
}

export default Header