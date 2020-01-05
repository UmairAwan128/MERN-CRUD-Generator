import React, { Component } from "react";
import Joi from "joi-browser";
import { saveOrder, getOrder } from "../services/orderService";
import { getUsers } from "../services/userService";
import { getStatuss } from "../services/statusService";
import { getProducts } from "../services/productService";

class createOrder extends Component{

  state = {
    data: { OrderName: "", OrderDate: "", Comments: "", Email: "", Password: "", Phone: "", UserId: "", StatusId: "", ProductIds: [], },
    Users: [],
    Statuss: [],
    Products: [],
    errors: {}
  };

  scheema = {
    _id: Joi.string(),
    OrderName:  Joi.string()
      .required()
      .label("OrderName"),
    OrderDate:  Joi.date()
      .required()
      .label("OrderDate"),
    Comments:  Joi.string()
      .allow('').allow(null)
      .label("Comments"),
    Email:  Joi.string().email()
      .allow('').allow(null)
      .label("Email"),
    Password:  Joi.string()
      .allow('').allow(null)
      .label("Password"),
    Phone:  Joi.number()
      .required()
      .label("Phone"),
    UserId:  Joi.string()
      .required()
      .label("UserId"),
    StatusId:  Joi.string()
      .required()
      .label("StatusId"),
    ProductIds:  Joi.array()
      .label("ProductIds"),
    createdAt: Joi.date()
      .label("createAt")
  };

  async populateForm() {
    try {
      const orderId = this.props.match.params.id;
      if(orderId!=="new"){
        const { data } = await getOrder(orderId);
        this.setState({ data });
      }    
    } 
    catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found"); 
      }
    }
  }

  async populateUsers() {
    const { data: Users } = await getUsers();
    this.setState({ Users: Users });
  }

  async populateStatuss() {
    const { data: Statuss } = await getStatuss();
    this.setState({ Statuss: Statuss });
  }

  async populateProducts() {
    const { data: Products } = await getProducts();
    this.setState({ Products: Products });
  }

  async componentDidMount() {
    await this.populateForm();
    await this.populateUsers();
    await this.populateStatuss();
    await this.populateProducts();
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
    await saveOrder(this.state.data);
    this.props.history.push("/orders");
  };

  handleCheckBoxChange = event => {
    const data = { ...this.state.data };
    if(event.currentTarget.checked===true){
      data[event.currentTarget.name].push(event.currentTarget.value);
    }
    else{
      data[event.currentTarget.name] = data[event.currentTarget.name].filter(function(current){
     return current !== event.currentTarget.value;
     });
   }
     this.setState({ data: data});
  };

  render() {
    return (
      <div className="content">
        <h1>Order Form</h1>
        <form onSubmit={this.handleSubmit}>

          <div className="form-group">
              <label htmlFor="OrderName">OrderName</label>
              <input
                value={this.state.data["OrderName"]}
                onChange={this.handleChange}
                name="OrderName"
                id="OrderName"
                type="text"
                className="form-control"
              />
              {this.state.errors["OrderName"] && <div className="alert alert-danger">{this.state.errors["OrderName"]}</div>}
          </div>

          <div className="form-group">
              <label htmlFor="OrderDate">OrderDate</label>
              <input
                value={this.state.data["OrderDate"].substring(0, 10)}
                onChange={this.handleChange}
                name="OrderDate"
                id="OrderDate"
                type="date"
                className="form-control"
              />
              {this.state.errors["OrderDate"] && <div className="alert alert-danger">{this.state.errors["OrderDate"]}</div>}
          </div>

          <div className="form-group">
              <label htmlFor="Comments">Comments</label>
              <input
                value={this.state.data["Comments"]}
                onChange={this.handleChange}
                name="Comments"
                id="Comments"
                type="text"
                className="form-control"
              />
              {this.state.errors["Comments"] && <div className="alert alert-danger">{this.state.errors["Comments"]}</div>}
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
              <label htmlFor="UserId">Select User</label>
              <select
                value={this.state.data["UserId"]}
                onChange={this.handleChange}
                name="UserId"
                id="UserId"
                className="form-control"
                  >
                  <option value="" disabled defaultValue>
                     Select User
                  </option>
                  {this.state.Users.map(User => (
                    <option key={User._id} value={User._id}>
                      {User.name}
                    </option>
                  ))}
              </select>
              {this.state.errors["UserId"] && <div className="alert alert-danger">{this.state.errors["UserId"]}</div>}
          </div>

          <div className="form-group">
            <section className="section-preview">
              <label className="mr-2">Status Name : </label> 
              {this.state.Statuss.map(Status => (
                  <div key={Status._id} className="custom-control custom-radio custom-control-inline">
                    <input 
                      type="radio" value={Status._id} onChange={this.handleChange} 
                      className="custom-control-input" id={Status._id} name="StatusId" 
                      checked = {this.state.data["StatusId"] === Status._id ? true:false}
                    />
                    <label className="custom-control-label" htmlFor={Status._id}>{Status.Name}</label>
                  </div>
                ))}
            </section>
          </div> 
          <div className="form-group">
              <label htmlFor="ProductIds">Select Products</label>
              <section className="section-preview form-group">
                  {this.state.Products.map(Product => (
                    <div key={Product._id} className="custom-control custom-checkbox custom-control-inline">
                        <input 
                          type="checkbox" value={Product._id} onChange={this.handleCheckBoxChange}
                          className="custom-control-input" id={Product._id} name="ProductIds"
                          checked = {this.state.data["ProductIds"].includes(Product._id)}
                        />
                        <label className="custom-control-label" htmlFor={Product._id}>{Product.Name}</label>
                    </div>
                  ))}
              </section>
          </div>
          <button disabled={this.validate()} className="btn btn-primary">Save</button>

        </form>
      </div>
    );
  }
}

export default createOrder;