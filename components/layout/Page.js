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
            
            {/* global css */}
            <style jsx global>{`
                ::-webkit-scrollbar {
                    width: 10px;
                    height: 5px;
                }
                
                /* Track */
                ::-webkit-scrollbar-track {
                    display: none;
                    background: transparent
                }
                
                /* Handle */
                ::-webkit-scrollbar-thumb {
                    background: #8f8f8f; 
                    border-radius: 10px;
                }
                
                .hover-nav-button:hover {
                    font-size: 1.5em;
                }

                .ant-modal-content {
                    border-radius: 20px;
                    /* background: red; */
                  }
            `}</style>
        </div>
    )
}

export default Page