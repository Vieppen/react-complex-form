import React, { Fragment } from 'react'
import ThisFormContext from '../context/ThisFormContext'

export default function HorizontalLine({ fieldName, fieldData }) {
    return (
        <ThisFormContext.Consumer>
            {form => {
                return (
                    <hr
                        className={`
                            ${form.config.commonClass || ''} 
                            form-element 
                            ${form.name}-element 
                            form-element-${fieldName} 
                            form-${fieldData.type} 
                            ${form.name}-${fieldData.type} 
                            ${fieldData.customClass || ''}
                            `}
                    />
                )
            }}
        </ThisFormContext.Consumer>
    )
}
