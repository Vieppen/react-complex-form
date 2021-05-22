import React from 'react'
import ThisFormContext from '../context/ThisFormContext'

export default function ParagraphField({ fieldName, fieldData }) {
    return (
        <ThisFormContext.Consumer>
            {form => {
                return (
                    <p
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
                    </p>
                )
            }}
        </ThisFormContext.Consumer>
    )
}
