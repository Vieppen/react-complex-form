import React, { useContext, useState } from 'react'

import { getConfig, getEmptyFormValue } from '../util/configUtil'

// INITIALIZE -----------------------------------------
export function createForm(config) {

    let name = ''
    let src = ''
    let configType = typeof config
    if (typeof config === "string") {
        let [method, value] = config.split(':')
        configType = method
        if (method === "public")
            name = value
        else if (method === "fetch")
            src = value
        else
            throw new Error(`The form config type ${method} is not valid. Please use 'public:{name}', 'fetch:{url}, or pass a config object instead.`)
    }


    const Context = React.createContext()
    const use = () => { return useContext(Context) }

    // move this to context
    // const initValue = getEmptyFormValue(config)

    return { name, src, Context, use, configType, config }
}

// CONSUMER ACCESS --------------------------------------------
export function useForm({ Context }) {
    if (!Context)
        return "Ooof"
    return useContext(Context)
}

// PROVIDER -------------------------------------------------
export function FormProvider({ children, form = null, forms = [] }) {

    // If a dev only wants to use one form, he does not need to pass a list
    if (form)
        forms = [...forms, form]

    if (forms.length === 0)
        return <React.Fragment>{children}</React.Fragment>

    const [{ name, src, Context, configType, config: initConfig }, ...rest] = forms

    let setInitConfig = typeof initConfig === "object" ? initConfig : null
    const [config, setConfig] = useState(setInitConfig)
    const [value, setValue] = useState(null)

    if (!config)
        getConfig(configType, name, src).then(inc => setConfig(inc))

    if (config && !value) {
        console.log(config.name, name)
        if (!config.name && name) {
            let tempConfig = { ...config }
            tempConfig.name = name
            setConfig(tempConfig)
        }
        else if (!config.name && !name)
            console.warn('A form is missing a name definition. Add the name to the config.')

        console.log(config.name)
        setValue(getEmptyFormValue(config))
    }

    if (!value)
        return <React.Fragment>{children}</React.Fragment>

    return (
        <Context.Provider value={{ config, value, setValue }}>
            <FormProvider forms={rest}>
                {children}
            </FormProvider>
        </Context.Provider>
    )
}