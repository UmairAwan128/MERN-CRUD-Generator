import React, { Component } from "react";
import Joi from "joi-browser";
import { saveProduct, getProduct } from "../services/productService";
import { getCategorys } from "../services/categoryService";

class createProduct extends Component{

  state = {
    data: { Price: "", Quantity: "", ProdName: "", CategoryId: "", },
    Categorys: [],
    errors: {}
  };

  scheema = {
    _id: Joi.string(),
    Price:  Joi.number()
      .required()
      .label("Price"),
    Quantity:  Joi.string()
      .allow('').allow(null)
      .label("Quantity"),
    ProdName:  Joi.string()
      .required()
      .label("ProdName"),
    CategoryId:  Joi.string()
      .required()
      .label("CategoryId"),
    createdAt: Joi.date()
      .label("createAt")
  };

  async populateForm() {
    try {
      const productId = this.props.match.params.id;
      if(productId!=="new"){
        const { data } = await getProduct(productId);
        this.setState({ data });
      }    
    } 
    catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found"); 
      }
    }
  }

  async populateCategorys() {
    const { data: Categorys } = await getCategorys();
    this.setState({ Categorys: Categorys });
  }

  async componentDidMount() {
    await this.populateForm();
    await this.populateCategorys();
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
    await saveProduct(this.state.data);
    this.props.history.push("/products");
  };

  render() {
    return (
      <div className="content">
        <h1>Product Form</h1>
        <form onSubmit={this.handleSubmit}>

          <div className="form-group">
              <label htmlFor="Price">Price</label>
              <input
                value={this.state.data["Price"]}
                onChange={this.handleChange}
                name="Price"
                id="Price"
                type="number"
                className="form-control"
              />
              {this.state.errors["Price"] && <div className="alert alert-danger">{this.state.errors["Price"]}</div>}
          </div>

          <div className="form-group">
              <label htmlFor="Quantity">Quantity</label>
              <input
                value={this.state.data["Quantity"]}
                onChange={this.handleChange}
                name="Quantity"
                id="Quantity"
                type="text"
                className="form-control"
              />
              {this.state.errors["Quantity"] && <div className="alert alert-danger">{this.state.errors["Quantity"]}</div>}
          </div>

          <div className="form-group">
              <label htmlFor="ProdName">ProdName</label>
              <input
                value={this.state.data["ProdName"]}
                onChange={this.handleChange}
                name="ProdName"
                id="ProdName"
                type="text"
                className="form-control"
              />
              {this.state.errors["ProdName"] && <div className="alert alert-danger">{this.state.errors["ProdName"]}</div>}
          </div>

          <div className="form-group">
              <label htmlFor="CategoryId">Select Category</label>
              <select
                value={this.state.data["CategoryId"]}
                onChange={this.handleChange}
                name="CategoryId"
                id="CategoryId"
                className="form-control"
                  >
                  <option value="" disabled defaultValue>
                     Select Category
                  </option>
                  {this.state.Categorys.map(Category => (
                    <option key={Category._id} value={Category._id}>
                      {Category.CatName}
                    </option>
                  ))}
              </select>
              {this.state.errors["CategoryId"] && <div className="alert alert-danger">{this.state.errors["CategoryId"]}</div>}
          </div>

          <button disabled={this.validate()} className="btn btn-primary custom-btn">Save</button>

        </form>
      </div>
    );
  }
}

export default createProduct;