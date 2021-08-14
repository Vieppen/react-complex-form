import React, { useState } from 'react'

import FieldRenderer from './fields/FieldRenderer'
import { ThisFormProvider } from './context/ThisFormContext'
import { useForm } from './context/DataContext'


export default function ContextForm({ form }) {

    const [config] = useState(form.config)      // Contains the form config json
    const [error, setError] = useState('')      // Contains the standard error message to be displayed in case of an error 

    const setExtern = form.use().setData

    function handleSubmit(event) {
        event.preventDefault()

        // if error checking is on
        // perform validity check !!!

        // then execute submit method
        onSubmit?.()

        // alternatively, perform onSubmit event as defined by config !!!
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
            setExtern={setExtern}
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
