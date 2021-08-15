import React from 'react'

export default function SpanField({ form, fieldName, fieldData }) {
    const { config } = form.use()

    return (
        <span
            className={`
                ${config.commonClass || ''} 
                form-element 
                ${config.name}-element 
                form-element-${fieldName} 
                form-${fieldData.type} 
                ${config.name}-${fieldData.type} 
                ${fieldData.customClass || ''}
                `}
        >
            {fieldData.text}
        </span>
    )
}
