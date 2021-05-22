import React from 'react'

import { Form2, getFormValue, getFormValues } from 'vieppen-form'

import './formDefault.css'

export default function App() {

    console.log(getFormValues("exampleForm"))
    console.log(getFormValue("exampleForm", "name"))

    return (
        <div>
            <Form2
                name="exampleForm"
            // customError={<div>Im a custom loading error.</div>}
            />
        </div>
    )
}
