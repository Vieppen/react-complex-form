import React from 'react'

export default function InputField({ form, fieldName, fieldData, autofocus }) {

    const { config, value, invalid, onChange } = form.use()

    const innerOnChange = event => {
        let newValue = event.target.value
        if (fieldData.type === 'checkbox') newValue = event.target.checked
        onChange(fieldName, newValue)
    }

    let errorClass = ''
    if (invalid.includes(fieldName))
        errorClass = `form-input-invalid form-input-${fieldData.type}-invalid`

    return (
        <input
            className={`
                ${config.commonClass || ''} 
                form-element 
                ${config.name}-element 
                form-element-${fieldName} 
                form-input
                ${config.name}-input 
                form-input-${fieldData.type} 
                ${config.name}-input-${fieldData.type} 
                ${fieldData.customclass || ''} 
                ${errorClass}
                `}

            name={fieldName}
            autoFocus={autofocus}

            {...fieldData}

            value={fieldData.text || value[fieldName]}
            checked={value[fieldName]}

            onChange={innerOnChange}
        />
    )
}
