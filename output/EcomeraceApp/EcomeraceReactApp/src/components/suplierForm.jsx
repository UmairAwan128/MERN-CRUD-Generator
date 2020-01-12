import React, { Component } from "react";
import Joi from "joi-browser";
import { saveSuplier, getSuplier } from "../services/suplierService";
import { getProducts } from "../services/productService";

class createSuplier extends Component{

  state = {
    data: { Name: "", Email: "", Phone: "", ProductIds: [], },
    Products: [],
    errors: {}
  };

  scheema = {
    _id: Joi.string(),
    Name:  Joi.string()
      .required()
      .label("Name"),
    Email:  Joi.string().email()
      .allow('').allow(null)
      .label("Email"),
    Phone:  Joi.number()
      .required()
      .label("Phone"),
    ProductIds:  Joi.array()
      .label("ProductIds"),
    createdAt: Joi.date()
      .label("createAt")
  };

  async populateForm() {
    try {
      const suplierId = this.props.match.params.id;
      if(suplierId!=="new"){
        const { data } = await getSuplier(suplierId);
        this.setState({ data });
      }    
    } 
    catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found"); 
      }
    }
  }

  async populateProducts() {
    const { data: Products } = await getProducts();
    this.setState({ Products: Products });
  }

  async componentDidMount() {
    await this.populateForm();
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
    await saveSuplier(this.state.data);
    this.props.history.push("/supliers");
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
        <h1>Suplier Form</h1>
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
              <label htmlFor="ProductIds">Select Product</label>
              <select
                value={this.state.data["ProductId"]}
                onChange={this.handleMultiSelectChange}
                multiple
                name="ProductIds"
                id="ProductIds"
                className="form-control"
                  >
                  {this.state.Products.map(Product => (
                    <option 
                       key={Product._id} value={Product._id}
                       selected = {this.state.data["ProductIds"].includes(Product._id)}>
                      {Product.ProdName}
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

export default createSuplier;