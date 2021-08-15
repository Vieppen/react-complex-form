import React from 'react'

import Form, { createForm, FormProvider } from 'vieppen-form'

import './formDefault.css'
import Inner from './Inner'

import exampleConfig from './exampleForms/exampleForm.json'

export const exampleForm1 = createForm(exampleConfig)
export const exampleForm2 = createForm('public:exampleForm')

export const copiedForm = exampleForm1.copy('1')

export default function App() {

    const onSubmit = () => {
        console.log("Overwrite: Submitted the form.")
    }

    return (
        <div>
            <FormProvider forms={[exampleForm1, exampleForm2, copiedForm]}>
                <Inner />
                <Form
                    form={exampleForm1}
                    overwriteSubmit={onSubmit}
                // customError={<div>Im a custom loading error.</div>}
                />
                <Form
                    form={exampleForm2}
                // customError={<div>Im a custom loading error.</div>}
                />
                <Form form={copiedForm} />
            </FormProvider>
        </div>
    )
}
