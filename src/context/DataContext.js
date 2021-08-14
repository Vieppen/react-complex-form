import React, { useContext, useState } from 'react'

export function createContextForm(config) {

    if (!config)
        throw new Error("Config object missing.")

    const Context = React.createContext()
    const initData = {}

    const use = () => useContext(Context)
    return { use, Context, config, initData }
}

export function useForm({ Context }) {
    return useContext(Context)
}

export function FormProvider({ children, context }) {

    const { Context, initData } = context

    const [data, setData] = useState(initData)


    return (
        <Context.Provider value={{ data, setData }}>
            {children}
        </Context.Provider>
    )
}
