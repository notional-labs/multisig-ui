import { ChainProvider } from "../components/Context";
import IntroPage from "../components/ulti/IntroPage";

export default function Home() {
  return (
    <ChainProvider>
        <IntroPage/>
    </ChainProvider>
  )
}
