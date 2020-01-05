import React, { Component } from "react";
import Joi from "joi-browser";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";
class LoginForm extends Component {
  state = {
    data: { email: "", password: "" },
    errors: {}
  };

  scheema = {
    email: Joi.string()
      .required()
      .email()
      .min(5)
      .max(255)
      .label("email"),
    password: Joi.string()
      .min(6)
      .max(255)
      .required()
      .label("password")
  };

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
    const result = Joi.validate(obj, scheema);
    return result.error ? result.error.details[0].message : null;
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors ? errors : {} }); 
    if (errors) return; 
    try {
      const { data } = this.state;
      await auth.login(data.email, data.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
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
    if (auth.isUserLoggedIn()) return <Redirect to="/" />;

    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>

          <div className="form-group">
              <label htmlFor="email">email</label>
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
              <label htmlFor="password">Password</label>
              <input
                value={this.state.data["password"]}
                onChange={this.handleChange}
                name="password"
                id="password"
                type="password"
                className="form-control"
              />
              {this.state.errors["password"] && <div className="alert alert-danger">{this.state.errors["password"]}</div>}
          </div>

          <button disabled={this.validate()} className="btn btn-primary">Login</button>

        </form>
      </div>
    );
  }
}

export default LoginForm;
