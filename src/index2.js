import React, { useState } from 'react'

import FieldRenderer from './fields/FieldRenderer'
import { ThisFormProvider } from './context/ThisFormContext'
import { getConfigData } from './util/configUtil'


export default function Form2({ name, customError }) {

    const [config, setConfig] = useState(null)      // Contains the form config json
    const [error, setError] = useState('')          // Contains the standard error message to be displayed in case of an error 

    // Load Config on start
    if (!config) {
        getConfigData(name)
            .then(initConfig => setConfig(initConfig))
            .catch(e => {
                console.log(e)
                setError('An error occured while loading a form.')
            })
    }


    function handleSubmit(event) {

    }

    // RENDER LOGIC ------------------------------------------------------------------

    // Error Rendering
    if (error) {
        return (
            <div className={`form-${name}`}>
                {customError || error}
            </div>
        )
    }

    // Loading Rendering
    if (!config) {
        return (
            <div className={`form-${name}`}>
                Loading {/* REPLACE WITH LOADING ICON */}
            </div>
        )
    }

    // Regular Form Rendering
    return (
        <ThisFormProvider
            formName={name}
            formConfig={config}
        >
            <div className={`form-${name} ${config.commonClass || ''}`}>
                <form
                    className={`form-wrapper ${name}-wrapper ${config.commonClass || ''}`}
                    onSubmit={event => handleSubmit(event)}
                >
                    {config.structure?.order?.map(row => {
                        return (
                            <div key={row} className={`form-row-wrapper ${name}-row-wrapper ${config.commonClass || ''}`}>
                                {row.map(fieldName => {
                                    return (
                                        <FieldRenderer
                                            key={fieldName}
                                            fieldName={fieldName}
                                            fieldData={config.content[fieldName]}
                                            autofocus={(fieldName === config.structure.autofocus)}
                                        />
                                    )
                                })}
                            </div>
                        )
                    })}
                </form>
            </div>
        </ThisFormProvider>
    )
}
