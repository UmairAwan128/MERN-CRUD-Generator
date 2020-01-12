import React, { Component } from "react";
import Joi from "joi-browser";
import { saveCustomer, getCustomer } from "../services/customerService";
import { getOrders } from "../services/orderService";

class createCustomer extends Component{

  state = {
    data: { Name: "", DOB: "", Email: "", Password: "", Phone: "", OrderIds: [], },
    Orders: [],
    errors: {}
  };

  scheema = {
    _id: Joi.string(),
    Name:  Joi.string()
      .required()
      .label("Name"),
    DOB:  Joi.date()
      .required()
      .label("DOB"),
    Email:  Joi.string().email()
      .allow('').allow(null)
      .label("Email"),
    Password:  Joi.string()
      .allow('').allow(null)
      .label("Password"),
    Phone:  Joi.number()
      .required()
      .label("Phone"),
    OrderIds:  Joi.array()
      .label("OrderIds"),
    createdAt: Joi.date()
      .label("createAt")
  };

  async populateForm() {
    try {
      const customerId = this.props.match.params.id;
      if(customerId!=="new"){
        const { data } = await getCustomer(customerId);
        this.setState({ data });
      }    
    } 
    catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found"); 
      }
    }
  }

  async populateOrders() {
    const { data: Orders } = await getOrders();
    this.setState({ Orders: Orders });
  }

  async componentDidMount() {
    await this.populateForm();
    await this.populateOrders();
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
    const result = Joi.validate(obj, scheema);
    return result.error ? result.error.details[0].message : null;
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
  handleSubmit = async (event) => {
    event.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors ? errors : {} });
    if (errors) return;
    await saveCustomer(this.state.data);
    this.props.history.push("/customers");
  };

  handleMultiSelectChange = event => {
    const data = { ...this.state.data };
    var options = event.target.options;
    data[event.currentTarget.name] = []; //remove old selected values
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) { //add new selected values
        data[event.currentTarget.name].push(options[i].value); 
      }
    }
    this.setState({ data: data});
  };

  render() {
    return (
      <div className="content">
        <h1>Customer Form</h1>
        <form onSubmit={this.handleSubmit}>

          <div className="form-group">
              <label htmlFor="Name">Name</label>
              <input
                value={this.state.data["Name"]}
                onChange={this.handleChange}
                name="Name"
                id="Name"
                type="text"
                className="form-control"
              />
              {this.state.errors["Name"] && <div className="alert alert-danger">{this.state.errors["Name"]}</div>}
          </div>

          <div className="form-group">
              <label htmlFor="DOB">DOB</label>
              <input
                value={this.state.data["DOB"].substring(0, 10)}
                onChange={this.handleChange}
                name="DOB"
                id="DOB"
                type="date"
                className="form-control"
              />
              {this.state.errors["DOB"] && <div className="alert alert-danger">{this.state.errors["DOB"]}</div>}
          </div>

          <div className="form-group">
              <label htmlFor="Email">Email</label>
              <input
                value={this.state.data["Email"]}
                onChange={this.handleChange}
                name="Email"
                id="Email"
                type="email"
                className="form-control"
              />
              {this.state.errors["Email"] && <div className="alert alert-danger">{this.state.errors["Email"]}</div>}
          </div>

          <div className="form-group">
              <label htmlFor="Password">Password</label>
              <input
                value={this.state.data["Password"]}
                onChange={this.handleChange}
                name="Password"
                id="Password"
                type="password"
                className="form-control"
              />
              {this.state.errors["Password"] && <div className="alert alert-danger">{this.state.errors["Password"]}</div>}
          </div>

          <div className="form-group">
              <label htmlFor="Phone">Phone</label>
              <input
                value={this.state.data["Phone"]}
                onChange={this.handleChange}
                name="Phone"
                id="Phone"
                type="number"
                className="form-control"
              />
              {this.state.errors["Phone"] && <div className="alert alert-danger">{this.state.errors["Phone"]}</div>}
          </div>

          <div className="form-group">
              <label htmlFor="OrderIds">Select Order</label>
              <select
                value={this.state.data["OrderId"]}
                onChange={this.handleMultiSelectChange}
                multiple
                name="OrderIds"
                id="OrderIds"
                className="form-control"
                  >
                  {this.state.Orders.map(Order => (
                    <option 
                       key={Order._id} value={Order._id}
                       selected = {this.state.data["OrderIds"].includes(Order._id)}>
                      {Order.OrderName}
                    </option>
                  ))}
              </select>
          </div>

          <button disabled={this.validate()} className="btn btn-primary custom-btn">Save</button>

        </form>
      </div>
    );
  }
}

export default createCustomer;