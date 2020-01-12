import React, { Component } from "react";import { getOrder } from "../services/orderService";
import { getUsers } from "../services/userService";
import { getStatuss } from "../services/statusService";
import { getProducts } from "../services/productService";

class OrderDetails extends Component{

  state = {
    data: { OrderName: "", OrderDate: "", UserId: "", StatusId: "", ProductIds: [], },
    Users: [],
    Statuss: [],
    Products: [],
    errors: {}
  };

  async populateForm() {
    try {
        const orderId = this.props.match.params.id;
        const { data } = await getOrder(orderId);
        this.setState({ data });
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

  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.history.push("/orders");
  };

  render() {
    return (
      <div className="content">
        <h1>Order Details</h1>
        <form onSubmit={this.handleSubmit}>

          <div className="form-group">
              <label  className="form-control"> OrderName :                 {this.state.data["OrderName"]}
              </label>
          </div>
          <div className="form-group">
              <label  className="form-control"> OrderDate :                 {this.state.data["OrderDate"].substring(0, 10)}
              </label>
          </div>
          <div className="form-group">
              <label  className="form-control"> Selected User : 
                  {this.state.Users.map(User => 
                      this.state.data["UserId"] == User._id ? " "+ User.name : ""
                  )}              </label>
          </div>
          <div className="form-group">
              <label  className="form-control"> Selected Status : 
                  {this.state.Statuss.map(Status => 
                      this.state.data["StatusId"] == Status._id ? " "+ Status.StatName : ""
                  )}              </label>
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

export default OrderDetails;