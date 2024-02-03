import { Api } from '../Api/api';
import useContextWrapper from "./useContextWrapper";
import { AuthContext } from "../Context/authContext";
import { useEffect } from 'react';

export const useRefreshToken = () => {
    const { authData, setAuthData } = useContextWrapper(AuthContext, {
        contextName: 'AuthContext',
        providerName: 'AuthProvider',
    })

    const refresh = async () => {
        const response = await fetch(`${Api}/auth/refresh`, {
            method: 'POST',
            headers: {
                'Authoization': `${authData.token}`
            },
            body: JSON.stringify({
                token: authData.token
            })
        });
        const data = await response.json();
        setAuthData({
            ...authData,
            token: data.access_token,
        });
    }

    useEffect(() => {
        refresh()
    }, [])
    
    return
};