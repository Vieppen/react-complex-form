# react-complex-form

### This is a beta version. Please report bugs and criticism of the approach. Thank you.

> An easy, JSON-driven approach to creating complex, reusable, and freely stylable forms.

[![NPM](https://img.shields.io/npm/v/vieppen-form.svg)](https://www.npmjs.com/package/vieppen-form) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-complex-form
```

## Usage

```jsx
import React from 'react'

import Form, { createForm, useForm, FormProvider } from 'react-complex-form'

const exampleConfig = {
  // Basic settings
  name: "exampleForm",
  storage: "local",
  commonClass: "any-example-common-class-name", // all elements of the form will share this class name

  // In the next section you can define all elements that are part of the form
  content: {
    formHeader: {
      type: "header",
      text: "Example for react-complex-form!"
    },
    fooText: {
      type: "text",
      placeholder: "Enter some short text here...",
      customclass: "foo-example-input-class" // this class name will only be applied to this element
    },
    boringEmail: {
      type: "email",
      placeholder: "Email here please."
    }
    barText: {
      type: "textarea",
      default: "Tell us your lifestory..."
      cols: 25,   // Most regular html attributes of the input fields are available here,
      rows: 10,   // such as maxLength, readOnly, disabled, etc...
      maxLength: 280
    },
    coolButton: {
      type: "submit",
      text: "Submit this stuff!"
    }
  },

  // The following section allows you to specify the structure of the form for different screen sizes
  structure: {
    "width-min": 0,
    "width-max": 2000,
    "submit-on-enter": true,
    "autofocus": "fooText",
    "order": [
      // Each inner array represents a row, and each element in the row a column. The layout styling can be
      // done using the form-row-wrapper and {formName}-row-wrapper as well as element classes.
      [
        "formHeader"
      ],
      [
        "fooText",
        "boringEmail"
      ],
      [
        "barText"
      ],
      [
        "coolButton"
      ]
    ]
  },

  events: {
    // Coming soon!
  }
}

// This is the default way of creating form.
// The name of the form (primarily relevant for css and local/session storage) has to be included in the config file.
const exampleForm = createForm(exampleConfig) 

// If you want to create another instance of a form using the same config, you can create a copy of the form
// and add an instance identifier which will be added to the name -> name: {name}:{instance id}
const copiedForm = exampleForm.copy('1')
// {form}.copy() will currently not copy already entered values! A function with this behaviour is planned for a future
// version tho.

// Alternatively, you can place the config as a json file in a subfolder called FormManager of your public folder
// -> "{project}/public/FormManager/{formName}.json". This option exists to make it easier for designers and
// developers to update their forms without having to go into the source code.
const publicForm = createForm("public:publicForm") // parameter "public:{formName}"

// Lastly, with similar reasoning, it is possible to instead fetch the form config from anywhere on the internet.
const fetchedForm = createForm("fetch:https://someurl.com/fetchedForm.json") // parameter "fetch:{formName}"


export default function App() {

  /*
  Since these forms use the react context model, they need to be contained in a FormProvider component. This 
  componenent can be anywhere in the hierarchy as long as it is above the corresponding Form component. You
  can use as many FormProviders at different levels of your application as youd like. A FormProvider component
  which is passed multiple forms will simply recursively call itself to provide context for each of the forms.
  As a result, form.use() or useForm(form) can only be called within components wrapped by the providers. If 
  you need to access the values of a form outside the provider, you can use the getFormValue("formName") / 
  getFormValues("formName") functions to retrieve the data from the local/session storage (if one of the two
  storage types was selected in the config of the form).
  */
  return (
    <>
    <OuterComponent />
    <FormProvider forms={[exampleForm, copiedForm, publicForm, fetchedForm]}>
      <Form form={exampleForm} />
      <Form form={copiedForm} />
      <InnerComponent />
    </FormProvider>
    <>
  )
}

function InnerComponent() {

  const { value } = exampleForm.use()

  const onSubmit = () => {
    // no need to call preventDefault here, as it already gets called by the form itself.
    // more options for form submission events will be added soon
    console.log(value)
  }

  return (
    <>
      <p>According to the exampleForm, your email is {value.boringEmail}</p>
      <Form form={publicForm} onSubmit={onSubmit} />
      <Form form={fetchedForm} />
    </>
  )
}

function OuterComponent() {

  const boringEmail = getFormValue("exampleForm", "boringEmail")
  // This method may not update correctly at the moment. It's advisable to use the context based value retrieval until a 
  // a later version.

  return (
    <>
      The local storage told me that your email is {boringEmail}.
    <>
  )

}
```

## Available elements:
header
label
paragraph
horizontal-line
text
password
email
checkbox
submit
textarea
tel
submit
color
date
datetime-local
file
month
number
range
search
time
week

### Coming soon:
Events!
Element overwrites
Custom elements
Selector element
RadioList element
Reset button element
Datalists
Form nesting
fieldset + legends
storage encryption
more submission options

## Selectors (classes)
(incomplete, but in essence applicable to all elements)

All DOM Elements
(commonClass)

<div> Wrapper
.form-wrapper           .(formName)-wrapper
.form-row-wrapper       .(formName)-row-wrapper

All Elements
.form-element           .(formName)-element         .form-element-(fieldName)
(customClass)

<input> Elements
.form-input             .(formName)-input
.form-input-text        .(formName)-input-text
.form-input-password    .(formName)-input-password
.form-input-email       .(formName)-input-email
.form-input-checkbox    .(formName)-input-checkbox
.form-input-submit      .(formName)-input-submit

<span> Elements
.form-header            .(formName)-header
.form-label             .(formName)-label

<p> Elements
.form-paragraph         .(formName)-paragraph

<hr> Elements
.form-horizontal-line   .(formName)-horizontal-line


.form-input-invalid
.form-input-text-invalid
.form-input-textarea-invalid
.form-input-checkbox-invalid (:checked)
...

## License

MIT © [ZJVieth](https://github.com/ZJVieth)
