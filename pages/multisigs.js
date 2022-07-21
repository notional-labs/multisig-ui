import "antd/dist/antd.css";
import Page from "../components/layout/Page";
import { ChainProvider } from "../components/Context";
import Container from "../components/layout/Container";
import MultisigList from "../components/list/MultisigList";

export default function Multisigs() {
  return (
    <ChainProvider>
      <Page>
        <Container
          option={0}
          component={
            <MultisigList />
          }
        />
      </Page>
    </ChainProvider>
  )
}
