import { useRouter } from 'next/router'
import Button from '../input/Button';

const routers = [
    {
        path: '/',
        name: 'All Multisigs'
    },
    {
        path: '/multisig',
        name: 'Create multisig'
    },
    {
        path: '/transaction',
        name: 'All Transations'
    },
]

const SideBar = ({ }) => {
    const router = useRouter()

    const push = (e, path) => {
        e.preventDefault()
        router.push(path)
    }

    console.log(router.pathname)

    return (
        <div
            style={{
                position: 'fixed',
                width: '400px'
            }}
        >
            {
                routers.map((route, index) => {
                    return (
                        <Button
                            clickFunction={(e) => push(e, route.path)}
                            text={route.name}
                            index={index}
                            style={{
                                borderRadius: '10px',
                                backgroundColor: '#ffffff',
                                color: router.pathname === route.path ? '#000000' : '#ffffff',
                                fontSize: '1.5rem',
                                boxShadow: '0 0 20 2 rgba(0, 0, 0, 0.25)',
                                border: 0,
                                marginBottom: '1rem',
                                width: router.pathname === route.path ? '100%' : '80%',
                                paddingTop: '.25em',
                                paddingBottom: '.25em'
                            }}
                        />
                    )
                })
            }
        </div>
    )
}

export default SideBar