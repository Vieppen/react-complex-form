import React, { useState } from 'react'

import Form, { createForm, FormProvider, getFormValue, getFormValues } from 'vieppen-form'

import './formDefault.css'
import Inner from './Inner'

import exampleConfig from './exampleForms/exampleForm.json'

export const exampleForm1 = createForm(exampleConfig)
export const exampleForm2 = createForm('public:exampleForm')

export default function App() {

    return (
        <div>
            <FormProvider forms={[exampleForm1, exampleForm2]}>
                <Inner />
                <Form
                    form={exampleForm1}
                // customError={<div>Im a custom loading error.</div>}
                />
                <Form
                    form={exampleForm2}
                // customError={<div>Im a custom loading error.</div>}
                />
            </FormProvider>
            <br />
            Same form using the public import method:
            {/* <Form
                form={exampleForm2}
            /> */}
        </div>
    )
}
