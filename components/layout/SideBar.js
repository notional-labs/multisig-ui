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

const SideBar = ({ }) => {
    const router = useRouter()

    const checkPath = (path) => {
        return router.pathname === path
    }

    return (
        <div
            style={{
                position: 'fixed',
                width: '350px'
            }}
        >
            {
                routers.map((route, index) => {
                    return (
                        <div
                            style={{
                                width: checkPath(route.path) ? '100%' : '80%',
                                backgroundColor: checkPath(route.path) ? '#ffffff' : '#000000',
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
                                    color: checkPath(route.path) ? '#000000' : '#ffffff',
                                    borderRadius: '10px',
                                    backgroundColor: checkPath(route.path) ? '#ffffff' : '#000000',
                                    fontSize: '1.5rem',
                                    border: 0,
                                    paddingTop: '.25em',
                                    paddingBottom: '.25em',
                                    width: checkPath(route.path) ? '80%' : '100%'
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