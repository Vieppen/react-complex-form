import React from 'react'

export default function TextAreaField({ form, fieldName, fieldData, autofocus }) {
    const { config, value, invalid, onChange } = form.use()

    let errorClass = ''
    if (invalid.includes(fieldName))
        errorClass = `form-input-invalid form-input-${fieldData.type}-invalid`

    return (
        <textarea
            className={`
                ${config.commonClass || ''} 
                form-element 
                ${config.name}-element 
                form-element-${fieldName} 
                form-input
                ${config.name}-input 
                form-input-${fieldData.type} 
                ${config.name}-input-${fieldData.type} 
                ${fieldData.customClass || ''} 
                ${errorClass}
                `}

            name={fieldName}
            autoFocus={autofocus}

            {...fieldData}

            value={value[fieldName]}

            onChange={event => onChange(fieldName, event.target.value)}
        />
    )
}
