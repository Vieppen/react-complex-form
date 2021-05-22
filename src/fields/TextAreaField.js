import React from 'react'
import ThisFormContext from '../context/ThisFormContext'

export default function TextAreaField({ fieldName, fieldData, autofocus }) {
    return (
        <ThisFormContext.Consumer>
            {form => {
                return (
                    <textarea
                        className={`
                            ${form.config.commonClass || ''} 
                            form-element 
                            ${form.name}-element 
                            form-element-${fieldName} 
                            form-input
                            ${form.name}-input 
                            form-input-${fieldData.type} 
                            ${form.name}-input-${fieldData.type} 
                            ${fieldData.customClass || ''}
                            `}

                        name={fieldName}
                        autoFocus={autofocus}

                        {...fieldData}

                        value={form.value[fieldName]}

                        onChange={event => form.onChange(fieldName, event.target.value)}
                    />
                )
            }}
        </ThisFormContext.Consumer>
    )
}
