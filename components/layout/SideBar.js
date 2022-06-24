import { useRouter } from 'next/router'
import Button from '../input/Button'

const routers = [
    {
        path: '/',
        name: 'All Multisigs'
    },
    {
        path: '/multisig/create',
        name: 'Create multisig'
    },
]

const multisigRouters = (multisigID) => {
    return [
        {
            path: `/multisig/${multisigID}`,
            pathname: `/multisig/[multisigID]`,
            name: 'Multisig'
        },
        {
            path: `/multisig/${multisigID}/all-transactions`,
            pathname: `/multisig/[multisigID]/all-transactions`,
            name: 'All Transactions'
        },
        {
            path: `/multisig/${multisigID}/transaction/create`,
            pathname: `/multisig/[multisigID]/transaction/create`,
            name: 'Create Transaction'
        },
        {
            path: `/`,
            pathname: `/`,
            name: 'Back'
        },
    ]
}

const transactionRouters = (multisigID, transactionID) => {
    return [
        {
            path: `/multisig/${multisigID}/transaction/${transactionID}`,
            pathname: `/multisig/[multisigID]/transaction/[transactionID]`,
            name: 'Transaction'
        },
        {
            path: `/multisig/${multisigID}`,
            pathname: `/multisig/[multisigID]`,
            name: 'Back'
        },
    ]
}

const SideBar = ({option}) => {
    const router = useRouter()
    const {multisigID, transactionID} = router.query

    const checkPath = (path) => {
        return router.pathname === path
    }

    console.log(router.pathname === '/')

    return (
        <div
            style={{
                position: 'fixed',
                width: '350px'
            }}
        >
            {
                option === 0 ? routers.map((route, index) => {
                    return (
                        <div
                            style={{
                                width: checkPath(route.path) ? '100%' : '80%',
                                backgroundColor: '#ffffff',
                                marginBottom: '1rem',
                                color: 'black',
                                borderRadius: checkPath(route.path) ? '10px 0 0 10px' : '10px',
                                boxShadow: '0px 0px 20px 2px rgba(0, 0, 0, 0.25)',
                            }}
                        >
                            <Button
                                type={'link'}
                                text={route.name}
                                index={index}
                                url={route.path}
                                style={{
                                    color: '#000000',
                                    borderRadius: '10px',
                                    backgroundColor: '#ffffff',
                                    fontSize: '1.5rem',
                                    border: 0,
                                    paddingTop: '.5em',
                                    paddingBottom: '.5em',
                                    width: checkPath(route.path) ? '80%' : '100%'
                                }}
                            />
                        </div>
                    )
                }) : option === 1 ? multisigRouters(multisigID).map((route, index) => {
                    return (
                        <div
                            style={{
                                width: checkPath(route.pathname) ? '100%' : '80%',
                                backgroundColor: route.pathname === '/' ? '#000000' : '#ffffff',
                                marginBottom: '1rem',
                                borderRadius: checkPath(route.pathname) ? '10px 0 0 10px' : '10px',
                                boxShadow: '0px 0px 20px 2px rgba(0, 0, 0, 0.25)',
                            }}
                        >
                            <Button
                                type={'link'}
                                text={route.name}
                                index={index}
                                url={route.path}
                                style={{
                                    color: route.pathname === '/' ? '#ffffff' : '#000000',
                                    borderRadius: '10px',
                                    backgroundColor: route.pathname === '/' ? '#000000' : '#ffffff',
                                    fontSize: '1.5rem',
                                    border: 0,
                                    paddingTop: '.5em',
                                    paddingBottom: '.5em',
                                    width: checkPath(route.pathname) ? '80%' : '100%'
                                }}
                            />
                        </div>
                    )
                }) : transactionRouters(multisigID, transactionID).map((route, index) => {
                    return (
                        <div
                            style={{
                                width: checkPath(route.pathname) ? '100%' : '80%',
                                backgroundColor: route.pathname === '/multisig/[multisigID]' ? '#000000' : '#ffffff',
                                marginBottom: '1rem',
                                borderRadius: checkPath(route.path) ? '10px 0 0 10px' : '10px',
                                boxShadow: '0px 0px 20px 2px rgba(0, 0, 0, 0.25)',
                            }}
                        >
                            <Button
                                type={'link'}
                                text={route.name}
                                index={index}
                                url={route.path}
                                style={{
                                    color: route.pathname === '/multisig/[multisigID]' ? '#ffffff' : '#000000',
                                    borderRadius: '10px',
                                    backgroundColor: route.pathname === '/multisig/[multisigID]' ? '#000000' : '#ffffff',
                                    fontSize: '1.5rem',
                                    border: 0,
                                    paddingTop: '.5em',
                                    paddingBottom: '.5em',
                                    width: checkPath(route.pathname) ? '80%' : '100%'
                                }}
                            />
                        </div>
                    )
                }) 
            }
        </div>
    )
}

export default SideBar