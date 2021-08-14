import React from 'react'
import { useForm } from 'vieppen-form'

import { exampleForm } from './App'

export default function Inner() {

    const form = useForm(exampleForm)
    console.log(exampleForm.use().data)

    return (
        <div>

        </div>
    )
}
