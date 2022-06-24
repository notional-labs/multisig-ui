import "antd/dist/antd.css";
import Page from '../../components/layout/Page';
import { ChainProvider } from "../../components/Context";
import Container from "../../components/layout/Container";
import MultisigCreate from "../../components/form/MultisigCreate";

export default () => {
    return (
        <ChainProvider>
            <Page>
                <div
                    style={{
                        backgroundImage: `url(/images/background.png)`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        minHeight: '100vh'
                    }}
                >
                    <Container
                        option={0}
                        component={
                            <MultisigCreate />
                        }
                    />
                </div>
            </Page>
        </ChainProvider>
    )
}