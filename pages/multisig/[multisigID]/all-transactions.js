import Page from "../../../components/layout/Page";
import { ChainProvider } from "../../../components/Context";
import Container from "../../../components/layout/Container";
import TransactionList from "../../../components/list/TransactionList";

export default function Transactions() {
    return (
        <ChainProvider>
            <Page
                enableSelectChain={false}
            >
                <Container
                    option={1}
                    component={
                        <TransactionList />
                    }
                />
            </Page>
        </ChainProvider>
    )
}