import { useRouter } from "next/router"
import MultisigList from "../list/MultisigList"

const ContainerContent = ({}) => {
    const router = useRouter()

    return (
        <div
            style={{
                backgroundColor: '#ffffff',
                minHeight: '70vh',
                borderRadius: '30px',
                position: 'relative',
                zIndex: 1,
                boxShadow: '0px 0px 20px 2px rgba(0, 0, 0, 0.25)',
                margin: '7em 30em'
            }}
        >
            {
                router.pathname === '/' && (
                    <MultisigList/>
                )
            }
        </div>
    )
}

export default ContainerContent