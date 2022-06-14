import Header from "../Header"

const Page = (props) => {
 
    return (
        <div
            className="page-container"
        >
            <Header/>
            {
                props.children
            }
        </div>
    )
}

export default Page