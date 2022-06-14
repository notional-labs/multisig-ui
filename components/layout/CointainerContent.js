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
                borderRadius: '10px'
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