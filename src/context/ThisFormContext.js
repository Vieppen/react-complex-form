import React, { useState } from 'react'
import { initiateStorage, updateStorage } from '../util/storageUtil'
import { getEmptyFormValue } from '../util/configUtil'

const ThisFormContext = React.createContext()
export default ThisFormContext

export function ThisFormProvider({ children, formName, formConfig }) {

    const [value, setValue] = useState(
        initiateStorage(formName, formConfig.storage, getEmptyFormValue(formConfig)))

    function onChange(fieldName, fieldValue) {
        let tempValue = { ...value }
        tempValue[fieldName] = fieldValue
        setValue(tempValue)
        updateStorage(formName, formConfig.storage, tempValue)  // using the value state causes a weird synchronization bug with checkboxes that are checked on default
    }

    return (
        <ThisFormContext.Provider
            value={{
                name: formName,
                config: formConfig,
                value: value,
                onChange: onChange
            }}
        >
            {children}
        </ThisFormContext.Provider>
    )

}
