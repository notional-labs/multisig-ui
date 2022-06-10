import FlexRow from "./flex_box/FlexRow"
import SelectChain from "./input/SelectChain"
import Image from "next/image"
import { ChainContext } from "./Context"
import { useContext } from "react"

const logo = (
    <FlexRow
        components={[
            (<Image
                src='/images/logo.png'
                width={'50px'}
                height={'50px'}
            />), (
                <text
                    style={{
                        fontSize: '2rem',
                        marginLeft: '10px'
                    }}
                >
                        MULTISIG
                </text>
            )
        ]}
        justifyContent={'space-between'}
        style={{
            
        }}
    />
)

const Header = () => {

    const {chain} = useContext(ChainContext)

    return (
        <div
            className="header"
            style={{
                backgroundImage: `${chain.color}`,
                color: '#ffffff',
                padding: '1em 5em',
                position: 'fixed',
                height: '85px',
                width: '100%',
                marginBottom: '80px'
            }}
        >
            <FlexRow
                components={[
                    logo, 
                    <SelectChain/>
                ]}
                justifyContent={'space-between'}
            />
        </div>
    )
}

export default Header