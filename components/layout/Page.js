import Header from "../Header"
import NextNProgress from "nextjs-progressbar";

const Page = ({ enableSelectChain = true, children }) => {

    return (
        <div
            className="page-container"
        >
            <NextNProgress
                color="#29D"
                startPosition={0.3}
                height={4}
                showOnShallow={true}
            />
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