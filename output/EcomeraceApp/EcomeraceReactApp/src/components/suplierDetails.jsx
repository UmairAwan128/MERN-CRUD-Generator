import React, { Component } from "react";import { getSuplier } from "../services/suplierService";
import { getProducts } from "../services/productService";

class SuplierDetails extends Component{

  state = {
    data: { Name: "", Email: "", Phone: "", ProductIds: [], },
    Products: [],
    errors: {}
  };

  async populateForm() {
    try {
        const suplierId = this.props.match.params.id;
        const { data } = await getSuplier(suplierId);
        this.setState({ data });
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

  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.history.push("/supliers");
  };

  render() {
    return (
      <div className="content">
        <h1>Suplier Details</h1>
        <form onSubmit={this.handleSubmit}>

          <div className="form-group">
              <label  className="form-control"> Name :                 {this.state.data["Name"]}
              </label>
          </div>
          <div className="form-group">
              <label  className="form-control"> Email :                 {this.state.data["Email"]}
              </label>
          </div>
          <div className="form-group">
              <label  className="form-control"> Phone :                 {this.state.data["Phone"]}
              </label>
          </div>
          <div className="form-group">
              <label  className="form-control"> Selected Product : 
                  {this.state.Products.map(Product => 
                      this.state.data["ProductIds"].includes(Product._id) ? " "+ Product.ProdName+"," : ""
                  )}
              </label>
          </div>
           <button className="btn btn-primary custom-btn">OK</button>

        </form>
      </div>
    );
  }
}

export default SuplierDetails;