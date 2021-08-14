import React from 'react'

import { PublicForm, ContextForm, createContextForm, FormProvider, getFormValue, getFormValues } from 'vieppen-form'

import './formDefault.css'
import Inner from './Inner'

import exampleConfig from './exampleForms/exampleForm.json'

export const exampleForm = createContextForm(exampleConfig)

export default function App() {

    console.log(getFormValues("exampleForm"))
    console.log(getFormValue("exampleForm", "message"))

    return (
        <div>
            <FormProvider context={exampleForm}>
                <Inner />
                <ContextForm
                    form={exampleForm}
                // customError={<div>Im a custom loading error.</div>}
                />
            </FormProvider>
            <br />
            Same form using the public import method:
            <PublicForm
                name='exampleForm'
            />
        </div>
    )
}
