import { useRouter } from "next/router"
import MultisigList from "../list/MultisigList"

const ContainerContent = ({}) => {
    const router = useRouter()

    return (
        <div
            style={{
                backgroundColor: '#ffffff',
                minHeight: '70vh',
                width: '100%',
                marginLeft: '350px',
                borderRadius: '0 10px 10px 10px',
                position: 'relative',
                zIndex: 2,
                boxShadow: '0px 0px 20px 2px rgba(0, 0, 0, 0.25)',
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