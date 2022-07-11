import "antd/dist/antd.css";
import Page from '../../components/layout/Page';
import { ChainProvider } from "../../components/Context";
import Container from "../../components/layout/Container";
import MultisigCreate from "../../components/form/MultisigCreate";

export default function MultisigCreatePage() {
    return (
        <ChainProvider>
            <Page>
                <Container
                    option={0}
                    component={
                        <MultisigCreate />
                    }
                />
            </Page>
        </ChainProvider>
    )
}