import React, {useContext} from "react"

interface Iconfig {
    contextName: string
    providerName: string
}

const useContextWrapper = <T>(
    ReactContext: React.Context<T>,
    config: Iconfig
) => {
    const context = useContext(ReactContext);
    const { contextName, providerName } = config;

    if (!context) {
        throw new Error(`No ${contextName} found in ${providerName}.`);
    }

    return context
}

export default useContextWrapper;