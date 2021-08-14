import React, { Component } from 'react'

import Form from 'vieppen-form'

class App extends Component {
  constructor(props) {
    super(props);

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.state = {
      formData: null
    }
  }

  componentDidMount() {
    Form.getEmptyFormData("exampleForm")
      .then(data => {
        this.setState({
          formData: data
        });
      })
  }

  handleFormChange(field, value, eventData) {
    this.setState({
      formData: Form.updateFormData(this.state.formData, field, value)
    });
  }

  handleFormSubmit(valid) {
    console.log(valid);
  }

  render() {
    if (this.state.formData) {
      return (
        <Form
          name="exampleForm"
          data={this.state.formData}
          checkValidity={true}
          onChange={this.handleFormChange}
          onSubmit={this.handleFormSubmit}
        />
      );
    }
    return null;
  }
}

export default App
