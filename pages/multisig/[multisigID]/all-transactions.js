import "antd/dist/antd.css";
import Page from '../../../components/layout/Page';
import { ChainProvider } from "../../../components/Context";
import Container from "../../../components/layout/Container";
import TransactionList from "../../../components/list/TransactionList";

export default () => {
    return (
        <ChainProvider>
            <Page
                enableSelectChain={false}
            >
                <div
                    style={{
                        backgroundImage: `url(/images/background.png)`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        minHeight: '100vh'
                    }}
                >
                    <Container
                        option={1}
                        component={
                            <TransactionList />
                        }
                    />
                </div>
            </Page>
        </ChainProvider>
    )
}