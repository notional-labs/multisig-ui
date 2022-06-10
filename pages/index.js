import "antd/dist/antd.css";
import Page from '../components/layout/Page';
import { ChainProvider } from "../components/Context";
import Container from "../components/layout/Container";

export default function Home() {
  return (
    <ChainProvider>
      <Page>
        <div
          style={{
            backgroundImage: `url(/images/background.png)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '100vh'
          }}
        >
          <Container />
        </div>
      </Page>
    </ChainProvider>
  )
}
