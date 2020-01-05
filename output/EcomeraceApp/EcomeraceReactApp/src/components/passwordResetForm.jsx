import React, { Component } from "react";
import Joi from "joi-browser";
import * as userService from "../services/userService";

class passwordResetForm extends Component {

  state = {
    data: {  _id: "",oldPassword: "", newPassword: "" },
    errors: {}
  };

  componentDidMount() {
  }

  async componentDidUpdate() {  
    await this.setUserId();
  }
 
  scheema = {
    _id: Joi.string(),
    oldPassword: Joi.string()
    .min(6)
    .max(255)
    .required()
    .label("oldPassword"),
    newPassword: Joi.string()
    .min(6)
    .max(255)
    .required()
    .label("newPassword")
  };

  async setUserId() {
    try {
        const data = { ...this.state.data };
        data["_id"] = this.props.user._id;
        this.setState({ data: data});
    } 
    catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found"); 
      }
    }
  }

  validate = () => {
    const result = Joi.validate(this.state.data, this.scheema, {
      abortEarly: false
    });
    
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateProperty = inputField => {
    const { name, value } = inputField;
    const obj = { [name]: value };
    const scheema = { [name]: this.scheema[name] };
    const result = Joi.validate(obj, scheema); //its not our validate() but its Joi.validate()
    return result.error ? result.error.details[0].message : null;
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors ? errors : {} }); 
    if (errors) return; 
    try {
        await userService.updatePassword(this.state.data);
        window.location = "/"; //go to homepage and reload it
        alert("Password Successfully Updated.");
    } catch (ex) {
        alert("Old Password is not valid.");
        if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors: errors });
      }
    }
  };

  handleChange = event => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(event.currentTarget);
    if (errorMessage) errors[event.currentTarget.name] = errorMessage;
    else delete errors[event.currentTarget.name];

    const data = { ...this.state.data };
    data[event.currentTarget.name] = event.currentTarget.value;
    this.setState({ data: data, errors: errors });
  };


  render() {
    
    return (
      <div className="content">
        <h1>Update Password</h1>
        <form onSubmit={this.handleSubmit}>

        <div className="alert alert-warning">Please Makes sure you enter correct password.</div>
          
          <div className="form-group">
              <label htmlFor="oldPassword"> Old Password </label>
              <input
                value={this.state.data["oldPassword"]}
                onChange={this.handleChange}
                name="oldPassword"
                id="oldPassword"
                type="password"
                className="form-control"
              />
              {this.state.errors["oldPassword"] && <div className="alert alert-danger">{this.state.errors["oldPassword"]}</div>}
          </div>

          <div className="form-group">
              <label htmlFor="newPassword"> New Password </label>
              <input
                value={this.state.data["newPassword"]}
                onChange={this.handleChange}
                name="newPassword"
                id="newPassword"
                type="password"
                className="form-control"
              />
              {this.state.errors["newPassword"] && <div className="alert alert-danger">{this.state.errors["newPassword"]}</div>}
          </div>
          
          <button disabled={this.validate()} className="btn btn-primary">Update</button>
        </form>
      </div>
    );
  }
}

export default passwordResetForm;
