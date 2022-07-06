import "antd/dist/antd.css";
import Page from '../components/layout/Page';
import { ChainProvider } from "../components/Context";
import Container from "../components/layout/Container";

export default function Home() {
  return (
    <ChainProvider>
      <Page>
        <Container
          type='dashboard'
        />
      </Page>
    </ChainProvider>
  )
}
