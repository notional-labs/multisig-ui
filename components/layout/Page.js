import Header from "../Header"

const Page = ({enableSelectChain = true, children}) => {

    return (
        <div
            className="page-container"
        >
            <Header
                enableSelectChain={enableSelectChain}
            />
            {
                children
            }
        </div>
    )
}

export default Page