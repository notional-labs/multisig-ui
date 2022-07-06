import Header from "../Header"
import NextNProgress from "nextjs-progressbar";
import Footer from "../Footer";
import TopUpButton from "../input/TopUpButton";

const Page = ({ enableSelectChain = true, children }) => {

    return (
        <div
            className="page-container"
        >
            <Header
                enableSelectChain={enableSelectChain}
            />
            <div
                style={{
                    backgroundImage: `url(/images/background.png)`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column'
                }}
            >
                {
                    children
                }
                <Footer />
            </div>
            <TopUpButton/>
        </div>
    )
}

export default Page