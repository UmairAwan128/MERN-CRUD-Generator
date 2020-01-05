import React, { Component } from "react";
import Joi from "joi-browser";
import { saveProduct, getProduct } from "../services/productService";
import { getCategorys } from "../services/categoryService";

class createProduct extends Component{

  state = {
    data: { Name: "", Price: "", Quantity: "", CategoryIds: [], },
    Categorys: [],
    errors: {}
  };

  scheema = {
    _id: Joi.string(),
    Name:  Joi.string()
      .required()
      .label("Name"),
    Price:  Joi.number()
      .required()
      .label("Price"),
    Quantity:  Joi.string()
      .allow('').allow(null)
      .label("Quantity"),
    CategoryIds:  Joi.array()
      .label("CategoryIds"),
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
        <h1>Product Form</h1>
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
              <label htmlFor="CategoryIds">Select Categorys</label>
              <section className="section-preview form-group">
                  {this.state.Categorys.map(Category => (
                    <div key={Category._id} className="custom-control custom-checkbox custom-control-inline">
                        <input 
                          type="checkbox" value={Category._id} onChange={this.handleCheckBoxChange}
                          className="custom-control-input" id={Category._id} name="CategoryIds"
                          checked = {this.state.data["CategoryIds"].includes(Category._id)}
                        />
                        <label className="custom-control-label" htmlFor={Category._id}>{Category.Name}</label>
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

export default createProduct;