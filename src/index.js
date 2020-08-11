import React, { Component } from 'react';

import { getTextFromStream } from './util/scriptUtil';
import { appendCSSFromString } from './util/cssUtil';
import { emailRegex } from './util/regexp';

class Form extends Component {

  // CONSTRUCTOR -----------------------------------------------------------
  constructor(props) {
    super(props);

    this.handleInput = this.handleInput.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);

    this.state = {
      error: false,
      config: null,
      errorData: null,
      currentDevice: "general",
      eventData: null
    }
  }
  // CONSTRUCTOR END -------------------------------------------------------------------

  // ON MOUNT ----------------------------------------------------------------------------
  componentDidMount() {

    // Load Form Config File
    fetch("FormManager/formConfig.json")
      .then(response => response.json())
      .then(obj => {
        let config = obj[this.props.name];

        // Load CSS FILES from config and apply main CSS file
        loadFormCSS(config)
          .then(cssData => {
            appendCSSFromString(".form-" + this.props.name, cssData[0]);
            this.setState({
              config: config,
              errorData: this.getInitErrorData(config),
              cssData: cssData
            });
            this.setState({
              currentDevice: this.getCurrentDevice()
            });
          });
      })
      .catch(err => {
        this.setState({
          error: true
        });
        console.log(err.toString());
      });

    // DEVICE UPDATE LISTENER
    window.addEventListener("resize", () => {
      let oldDevice = this.state.currentDevice;
      let newDevice = this.getCurrentDevice();
      if (oldDevice !== newDevice) {
        this.setState({
          currentDevice: this.getCurrentDevice()
        });
        this.setCustomDeviceCSS();
      }
    });

    // SUBMIT FORM ON ENTER LISTENER
    document.onkeydown = function (event) {
      if (event.keyCode === 13 && this.state.config.structure[this.state.currentDevice]["submit-on-enter"]) {
        this.handleSubmit(event);
      }
    }.bind(this);
  }
  // ON MOUNT END -----------------------------------------------------------------------

  // FORM STATE HANDLING FUNCTIONS -------------------------------------------------------
  getCurrentDevice() {
    for (let device in this.state.config.structure) {
      if (
        window.screen.width >= this.state.config.structure[device]["width-min"] &&
        window.screen.width < this.state.config.structure[device]["width-max"]) {
        return device;
      }
    }
    return "general";
  }

  setCustomDeviceCSS() {
    if (this.state.cssData[this.state.currentDevice] !== "")
      appendCSSFromString("#" + this.props.name, this.state.cssData[this.state.currentDevice]);
  }

  checkFormValidity() {
    let data = this.props.data;
    let content = this.state.config.content;
    let error = {};

    let valid = true;

    for (let field in content) {

      if (!content[field].optional) {

        error[field] = formError(content[field].type, data[field]);
        if (error[field]) valid = false;

      }
    }

    this.setState({
      errorData: error
    });

    return valid;
  }
  // FORM STATE HANDLING FUNCTIONS END ----------------------------------------------------------------

  // FORM DATA HANDLING METHODS --------------------------------------------------------------------
  handleChange(field, value) {
    this.props.onChange(field, value, this.state.eventData);
  }

  handleInput(event, field) {
    this.handleChange(field, event.target.value);
  }

  toggleCheckbox(event, field) {
    this.handleChange(field, event.target.checked);
  }

  handleSubmit(event) {
    event.preventDefault();

    let valid = true;
    if (this.props.checkValidity) {
      valid = this.checkFormValidity()
    }

    this.props.onSubmit(valid);
  }
  // FORM DATA HANDLING METHODS END ------------------------------------------------------------------

  // Function That is responsible for the render logic of each field
  renderField(name, obj, value, error, autofocus) {

    // ALL INPUT FIELDS
    if (
      obj.type === "text" ||
      obj.type === "email" ||
      obj.type === "password" ||
      obj.type === "checkbox" ||
      obj.type === "submit"
    ) {

      let errorClass = "";
      if (error) errorClass = "form-input-error form-input-" + obj.type + "-error";

      let changeHandler = this.handleInput;
      if (obj.type === "checkbox")
        changeHandler = this.toggleCheckbox;
      else if (obj.type === "submit")
        changeHandler === null;

      return (
        <input
          key={name}
          type={obj.type}

          className={
            "form-element "
            + "form-input"
            + "input-" + obj.type + " "
            + errorClass + " "
            + obj["custom-style"]
          }

          autoFocus={autofocus}
          value={(obj.text) ? obj.text : value}
          checked={value}
          placeholder={obj.placeholder}

          onChange={event => changeHandler(event, name)}
          onSubmit={event => (obj.type === "submit") ? this.handleSubmit(event) : null}
        />
      );

    }
    // Textarea
    else if (
      obj.type === "textarea"
    ) {

      let errorClass = "";
      if (error) errorClass = "form-input-error form-input-" + obj.type + "-error";

      return (
        <textarea
          key={name}
          type={obj.type}

          className={
            "form-element "
            + "form-input "
            + "form-input-textarea "
            + errorClass + " "
            + obj["custom-style"]}

          autoFocus={autofocus}
          placeholder={obj.placeholder}
          value={value}

          onChange={event => this.handleInput(event, name)}
        />
      );
    }
    // Headers and Labels
    else if (
      obj.type === "header" ||
      obj.type === "label"
    ) {
      return (
        <span
          key={name}
          className={
            "form-element "
            + "form-" + obj.type + " "
            + obj["custom-style"]
          }
        >
          {obj.text}
        </span>
      );
    }
    // Horizontal Line
    else if (
      obj.type === "horizontal-line"
    ) {
      return (
        <hr
          key={name}
          className={
            "form-element "
            + "horizontal-line "
            + obj["custom-style"]
          }
        />
      );
    }

    return null;
  }


  // RENDER -------------------------------------------------------------------------------------
  render() {

    // Error Rendering
    if (this.state.error) {
      if (this.props.errorDisplay !== null) return this.props.errorDisplay;
      return <div>An error occured. Please reload the page.</div>
    }
    // Loading Rendering
    else if (this.state.config === null) {
      return (
        <div className={"form-" + this.props.name} />
      );
    }
    // Form Rendering
    else {

      let content = this.state.config.content;
      let structure = this.state.config.structure[this.state.currentDevice];

      return (
        <div className={"form-" + this.props.name}>
          <form
            className={"form-wrapper"}
            onSubmit={event => this.handleSubmit(event)}
          >
            {
              structure.order.map(row => {
                return (
                  <div className="form-row-wrapper" key={row}>
                    {
                      row.map(field => {

                        return this.renderField(
                          field,
                          content[field],
                          this.props.data[field],
                          this.state.errorData[field],
                          (field === structure.autofocus)
                          //this.state.eventData.actions
                        );
                      })
                    }
                  </div>
                );
              })
            }
          </form >
        </div>
      );
    }
  }
  // RENDER END -----------------------------------------------------------------------------------

  // DATA FUNCTIONS ------------------------------------------------------------------------

  getInitErrorData(config) {
    let errorData = {};
    for (let field in config.content) {
      errorData[field] = false;
    }
    return errorData;
  }

  static updateFormData(dataIn, field, value) {
    let data = dataIn;
    data[field] = value;
    return data;
  }

  static async getEmptyFormData(formName) {
    let data = {};

    let response = await fetch("FormManager/formConfig.json");
    let obj = await response.json();

    let config = obj[formName];

    for (let field in config.content) {
      let defaultValue = "";
      if (config.content[field].default !== undefined)
        defaultValue = config.content[field].default;
      data[field] = defaultValue;
    }

    return data;

  }
  // STATIC DATA FUNCTIONS END ---------------------------------------------------

}

export default Form;

// Error Check Function per Field
function formError(type, value) {
  // EMAIL FIELD
  if (type === "email") {
    if (!emailRegex.test(value))
      return true;
    return false;

    // TEXT FIELD
  } else if (type === "text" || type === "password" || type === "textarea") {
    if (value === "")
      return true;
    return false;

  }
}

// Function that loads the CSS data for all device structures and main CSS
async function loadFormCSS(config) {

  let pathBase = "FormManager/styles/";
  let cssData = [];

  cssData.push(
    await fetch(pathBase + config.stylesheet + ".css")
      .then(response =>
        getTextFromStream(response.body)
      )
  );

  // Preload all device specific CSS files
  for (let device in config.structure) {
    if (config.structure[device]["custom-stylesheet"] !== null && config.structure[device]["custom-stylesheet"] !== "") {

      await fetch(pathBase + config.structure[device]["custom-stylesheet"] + ".css")
        .then(response => {
          getTextFromStream(response.body)
            .then(string => cssData[device] = string);
        });

    }
  }

  return cssData;

}