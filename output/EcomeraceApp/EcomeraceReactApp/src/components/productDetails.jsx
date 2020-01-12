import React, { Component } from "react";import { getProduct } from "../services/productService";
import { getCategorys } from "../services/categoryService";

class ProductDetails extends Component{

  state = {
    data: { Price: "", Quantity: "", ProdName: "", CategoryId: "", },
    Categorys: [],
    errors: {}
  };

  async populateForm() {
    try {
        const productId = this.props.match.params.id;
        const { data } = await getProduct(productId);
        this.setState({ data });
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

  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.history.push("/products");
  };

  render() {
    return (
      <div className="content">
        <h1>Product Details</h1>
        <form onSubmit={this.handleSubmit}>

          <div className="form-group">
              <label  className="form-control"> Price :                 {this.state.data["Price"]}
              </label>
          </div>
          <div className="form-group">
              <label  className="form-control"> Quantity :                 {this.state.data["Quantity"]}
              </label>
          </div>
          <div className="form-group">
              <label  className="form-control"> ProdName :                 {this.state.data["ProdName"]}
              </label>
          </div>
           <button className="btn btn-primary custom-btn">OK</button>

        </form>
      </div>
    );
  }
}

export default ProductDetails;