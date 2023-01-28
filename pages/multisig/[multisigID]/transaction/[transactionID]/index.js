import Page from "../../../../../components/layout/Page";
import Container from "../../../../../components/layout/Container";
import { ChainProvider } from "../../../../../components/Context";
import TransactionView from "../../../../../components/data_view/TransactionView";

export default function Transaction() {
    return (
        <ChainProvider>
            <Page
                enableSelectChain={false}
            >
                <Container
                    option={2}
                    component={
                        <TransactionView />
                    }
                />
            </Page>
        </ChainProvider>
    )
}