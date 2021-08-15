import React, { useState } from 'react'

import FieldRenderer from './fields/FieldRenderer'
import { ThisFormProvider } from './context/ThisFormContext'
import { getConfigData } from './util/configUtil'

import Form from './Form'
export default Form
// import ContextForm from './ContextForm'
// import PublicForm from './PublicForm'
// export { ContextForm, PublicForm }

import { getFormValue, getFormValues } from './util/storageUtil'
export { getFormValue, getFormValues }

import { createForm, useForm, FormProvider } from './context/DataContext'
export { createForm, useForm, FormProvider }
