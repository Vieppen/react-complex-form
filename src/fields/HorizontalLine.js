import React from 'react'

export default function HorizontalLine({ form, fieldName, fieldData }) {
    const { config } = form.use()

    return (
        <hr
            className={`
                ${config.commonClass || ''} 
                form-element 
                ${config.name}-element 
                form-element-${fieldName} 
                form-${fieldData.type} 
                ${config.name}-${fieldData.type} 
                ${fieldData.customClass || ''}
                `}
        />
    )
}
