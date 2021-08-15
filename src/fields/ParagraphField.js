import React from 'react'

export default function ParagraphField({ form, fieldName, fieldData }) {
    const { config } = form.use()
    return (
        <p
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
        </p>
    )
}
