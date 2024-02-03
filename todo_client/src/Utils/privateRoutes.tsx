import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../Context/authContext'
import useContextWrapper from '../hooks/useContextWrapper'

const PrivateRoutes = () => {
    const { authData } = useContextWrapper(AuthContext, {
        contextName: 'AuthContext',
        providerName: 'AuthProvider',
    })

    console.log(authData)

    return(
        authData?.token ? <Outlet/> : <Navigate to="/auth"/>
    )
}

export default PrivateRoutes