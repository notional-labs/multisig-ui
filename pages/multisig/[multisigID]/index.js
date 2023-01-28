import Page from "../../../components/layout/Page";
import { ChainProvider } from "../../../components/Context";
import Container from "../../../components/layout/Container";
import MultisigView from "../../../components/data_view/MultisigView";

export default function Multisig() {
    return (
        <ChainProvider>
            <Page
                enableSelectChain={false}
            >
                <Container
                    option={1}
                    component={
                        <MultisigView />
                    }
                />
            </Page>
        </ChainProvider>
    )
}