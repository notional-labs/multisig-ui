import "antd/dist/antd.css";
import Page from "../../../../components/layout/Page";
import Container from "../../../../components/layout/Container";
import { ChainProvider } from "../../../../components/Context";
import TransactionCreate from "../../../../components/form/TransactionCreate";

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
                            <TransactionCreate />
                        }
                    />
                </div>
            </Page>
        </ChainProvider>
    )
}