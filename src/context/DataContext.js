import React, { useEffect, useContext, useState } from 'react'

import { checkFormValidity, getConfig, getEmptyFormValue } from '../util/configUtil'
import { initiateStorage, updateStorage } from '../util/storageUtil'

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

    const copy = key => {

        const Context = React.createContext()
        const use = () => { return useContext(Context) }

        return {
            name,
            src,
            Context,
            use,
            configType,
            config: { ...config },
            copy,
            instance: `:${key}`
        }
    }

    // move this to context
    // const initValue = getEmptyFormValue(config)

    return { name, src, Context, use, configType, config, copy, instance: '' }
}

// CONSUMER ACCESS --------------------------------------------
export function useForm({ Context }) {
    if (!Context)
        return
    return useContext(Context)
}

// PROVIDER COMPONENT -------------------------------------------------
export function FormProvider({ children, form = null, forms = [] }) {

    // If a dev only wants to use one form, he does not need to pass a list
    if (form)
        forms = [...forms, form]

    // Guard Clause
    if (forms.length === 0)
        return <React.Fragment>{children}</React.Fragment>

    const [{ name, src, Context, configType, config: initConfig, instance }, ...rest] = forms

    const [error, setError] = useState({ state: false, message: 'An error occured while loading the form.' })      // Contains the standard error message to be displayed in case of an error 
    const [config, setConfig] = useState(null)
    const [value, setValue] = useState(null)
    const [invalid, setInvalid] = useState([])

    // Config Loading ------------------------------------------------------------------------------
    useEffect(() => {
        getConfig(configType, initConfig, name, src).then(inc => setConfig(inc))
    }, [])

    // Value Initializing and Config Update -------------------------------------------------------
    useEffect(() => {

        if (config && !value) {
            // update the error message according to the config
            setError({ state: false, message: config.error || error })

            // first check if the form is named and add the name to the config if necessary
            const setName = `${name || config.name}${instance}`
            let tempConfig = { ...config }
            tempConfig.name = setName
            setConfig(tempConfig)

            if (!config.name && !name)
                console.warn('A form is missing a name definition. Add the name to the config.')

            // initialize the value with empty/default or values from storage 
            const initValue = getEmptyFormValue(config)
            setValue(initiateStorage(setName, config.storage, initValue))
        }

    }, [config])

    // Form Function Methods --------------------------------------------------------------------------

    const onChange = (fieldName, fieldValue) => {
        let tempValue = { ...value }
        tempValue[fieldName] = fieldValue
        setValue(tempValue)
        updateStorage(config.name, config.storage, tempValue)  // using the value state causes a weird synchronization bug with checkboxes that are checked on defaul
    }

    const onSubmit = (event, regular, overwrite) => {
        event.preventDefault()

        console.log("Submitting")

        // if error checking is on
        // perform validity check
        const newInvalid = checkFormValidity(value, config)
        setInvalid(newInvalid)
        if (newInvalid.length > 0)
            return

        // Perform Submit Events

        // execute overwrite and cancel after
        if (overwrite)
            overwrite()

        // otherwise perform passed submit event
        regular()

        // then perform onSubmit event as defined by config !!!
        // ...
    }

    // Render ---------------------------------------------------------------------------------------------

    // Render Loading -> in Form Component
    if (!value)
        return <React.Fragment>{children}</React.Fragment>

    // Render Provider Stack
    return (
        <Context.Provider value={{ error, config, value, setValue, invalid, onChange, onSubmit }}>
            <FormProvider forms={rest}>
                {children}
            </FormProvider>
        </Context.Provider>
    )
}