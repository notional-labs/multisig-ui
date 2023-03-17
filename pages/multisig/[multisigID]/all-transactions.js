import Page from "../../../components/layout/Page";
import { ChainProvider } from "../../../components/Context";
import Container from "../../../components/layout/Container";
import TransactionList from "../../../components/list/TransactionList";
import { getMultisigByAddress } from "../../../libs/faunaClient";

export async function getServerSideProps(context) {
    try {
        const multisigiD = context.params.multisigID;
        const saveRes = await getMultisigByAddress({
            address: multisigiD
        });
        return {
            props: {
                multisig: saveRes.data.data.getMultisig
            }, // will be passed to the page component as props
        }
    }
    catch (e) {
        return {
            props: {
                multisig: null
            }
        }
    }
}


export default function Transactions(props) {
    return (
        <ChainProvider>
            <Page
                enableSelectChain={false}
            >
                <Container
                    option={1}
                    component={
                        <TransactionList
                            multisig={props.multisig}
                        />
                    }
                />
            </Page>
        </ChainProvider>
    )
}