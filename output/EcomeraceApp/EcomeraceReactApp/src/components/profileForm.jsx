import React, { Component } from "react";
import Joi from "joi-browser";
import * as userService from "../services/userService";

class ProfileForm extends Component {

  state = {
    data: { email: "", name: "", _id: "" },
    errors: {}
  };

  async componentDidMount() {
    await this.populateUser();
  }

  scheema = {
    _id: Joi.string(),
    email: Joi.string()
      .required()
      .email()
      .min(6)
      .max(255)
      .label("email"),
    name: Joi.string()
      .required()
      .min(5)
      .max(255)
      .label("Name")   
  };

  async populateUser() {
    try {
      const user = {
          email:this.props.user.email,
          name: this.props.user.name,
          _id: this.props.user._id 
      };
      this.setState({ data : user });    
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
      await userService.updateUser(this.state.data);
      window.location = "/"; //go to homepage and reload it

    } catch (ex) {
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
        <h1>User Information</h1>
        <form onSubmit={this.handleSubmit}>

          <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                value={this.state.data["email"]}
                onChange={this.handleChange}
                name="email"
                id="email"
                type="text"
                className="form-control"
              />
              {this.state.errors["email"] && <div className="alert alert-danger">{this.state.errors["email"]}</div>}
          </div>

          <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                value={this.state.data["name"]}
                onChange={this.handleChange}
                name="name"
                id="name"
                type="name"
                className="form-control"
              />
              {this.state.errors["name"] && <div className="alert alert-danger">{this.state.errors["name"]}</div>}
          </div>

          <button disabled={this.validate()} className="btn btn-primary custom-btn">Update</button>

        </form>
      </div>
    );
  }
}

export default ProfileForm;
