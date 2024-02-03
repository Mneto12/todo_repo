import React, {useMemo, useState, createContext} from "react";
import useContextWrapper from "../hooks/useContextWrapper";

interface IAuthData {
    id: string
    token: string
    username: string
}

interface Itask {
    id: string
    title: string
    description: string
    completed: boolean
    userId: string
}

interface Icontext {
    authData: IAuthData | null
    setAuthData: React.Dispatch<React.SetStateAction<IAuthData | null>>
    task: Array<Itask>
    setTask: React.Dispatch<React.SetStateAction<Array<Itask>>>
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthContext = createContext<Icontext | null>(null)

export const useAppContext = () => {
    useContextWrapper(AuthContext, {
        contextName: useAppContext.name,
        providerName: AuthProvider.name,
    })
}

export const AuthProvider = ({children}: React.PropsWithChildren) => {
    // variable to be consumed for the context
    const [authData, setAuthData] = useState<IAuthData | null>({} as IAuthData | null)
    const [task, setTask] = useState<Array<Itask>>([])
    const [loading, setLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    // Memo tasks
    const value = useMemo(() => (
        {authData, setAuthData, task, setTask, loading, setLoading, isOpen, setIsOpen}
    ), [authData, setAuthData, task, setTask, loading, setLoading, isOpen, setIsOpen])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}