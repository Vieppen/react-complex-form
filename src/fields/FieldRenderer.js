import React from 'react'

import InputField from './InputField'
import TextAreaField from './TextAreaField'
import SpanField from './SpanField'
import ParagraphField from './ParagraphField'
import HorizontalLine from './HorizontalLine'

export default function FieldRenderer({ fieldName, fieldData, autofocus }) {

    // Classic Input Fields
    if (['text',
        'email',
        'password',
        'tel',
        'checkbox',
        'submit',
        'color',
        'date',
        'datetime-local',
        'file',
        'month',
        'number',
        'range',
        'search',
        'time',
        'week'].includes(fieldData?.type)) {
        return <InputField fieldName={fieldName} fieldData={fieldData} autofocus={autofocus} />
    }

    // Textarea
    else if (fieldData?.type === 'textarea') {
        return <TextAreaField fieldName={fieldName} fieldData={fieldData} autofocus={autofocus} />
    }

    // // Selector
    // else if (fieldData?.type === 'selector') {
    //     return <SelectorField />
    // }

    // Headers, Labels and Paragraphs
    else if (['header',
        'label'].includes(fieldData?.type)) {
        return <SpanField fieldName={fieldName} fieldData={fieldData} />
    }

    // Paragraphs
    else if (fieldData?.type === 'paragraph') {
        return <ParagraphField fieldName={fieldName} fieldData={fieldData} />
    }

    // Horizontal Line
    else if (fieldData?.type === 'horizontal-line') {
        return <HorizontalLine fieldName={fieldName} fieldData={fieldData} />
    }

    return null
}