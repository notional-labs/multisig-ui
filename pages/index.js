import "antd/dist/antd.css";
import { ChainProvider } from "../components/Context";
import IntroPage from "../components/ulti/IntroPage";
import { createProto } from "../libs/gen-proto";

export async function getServerSideProps() {
  await createProto()
  return {
    props: { status: "success" }
  }
}

export default function Home() {
  return (
    <ChainProvider>
        <IntroPage/>
    </ChainProvider>
  )
}
