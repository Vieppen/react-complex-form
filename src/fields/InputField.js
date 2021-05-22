import React from 'react'
import ThisFormContext from '../context/ThisFormContext'

export default function InputField({ fieldName, fieldData, autofocus }) {

    function onChange(event, form) {
        let value = event.target.value
        if (fieldData.type === 'checkbox') value = event.target.checked
        form.onChange(fieldName, value)
    }

    return (
        <ThisFormContext.Consumer>
            {form => {
                return (
                    <input
                        className={`
                            ${form.config.commonClass || ''} 
                            form-element 
                            ${form.name}-element 
                            form-element-${fieldName} 
                            form-input
                            ${form.name}-input 
                            form-input-${fieldData.type} 
                            ${form.name}-input-${fieldData.type} 
                            ${fieldData.customclass || ''}
                            `}

                        name={fieldName}
                        autoFocus={autofocus}

                        {...fieldData}

                        value={fieldData.text || form.value[fieldName]}
                        checked={form.value[fieldName]}

                        onChange={event => onChange(event, form)}
                    />
                )
            }}
        </ThisFormContext.Consumer>
    )
}
