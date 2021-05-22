import React from 'react'
import ThisFormContext from '../context/ThisFormContext'

export default function SpanField({ fieldName, fieldData }) {
    return (
        <ThisFormContext.Consumer>
            {form => {
                return (
                    <span
                        className={`
                        ${form.config.commonClass || ''} 
                        form-element 
                        ${form.name}-element 
                        form-element-${fieldName} 
                        form-${fieldData.type} 
                        ${form.name}-${fieldData.type} 
                        ${fieldData.customClass || ''}
                        `}
                    >
                        {fieldData.text}
                    </span>
                )
            }}
        </ThisFormContext.Consumer>
    )
}
