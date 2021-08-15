import React, { useState } from 'react'

import FieldRenderer from './fields/FieldRenderer'

export default function Form({
    form,
    overwriteError,
    onSubmit: regularSubmit = () => { }, overwriteSubmit
}) {

    if (!form.use())
        return <React.Fragment></React.Fragment>

    const { error, config, onSubmit } = form.use()
    const { name } = config

    // RENDER LOGIC ------------------------------------------------------------------

    // Error Rendering
    if (error.state) {
        return (
            <div className={`form-${name}`}>
                {overwriteError || error.message}
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
        <div className={`form-${name} ${config.commonClass || ''}`}>
            <form
                className={`form-wrapper ${name}-wrapper ${config.commonClass || ''}`}
                onSubmit={e => onSubmit(e, regularSubmit, overwriteSubmit)}
            >
                {config.structure?.order?.map(row => {
                    return (
                        <div key={row} className={`form-row-wrapper ${name}-row-wrapper ${config.commonClass || ''}`}>
                            {row.map(fieldName => {
                                return (
                                    <FieldRenderer
                                        form={form}
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
    )
}
