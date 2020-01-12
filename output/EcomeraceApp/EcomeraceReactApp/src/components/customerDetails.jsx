import React, { Component } from "react";import { getCustomer } from "../services/customerService";
import { getOrders } from "../services/orderService";

class CustomerDetails extends Component{

  state = {
    data: { Name: "", DOB: "", Email: "", Password: "", Phone: "", OrderIds: [], },
    Orders: [],
    errors: {}
  };

  async populateForm() {
    try {
        const customerId = this.props.match.params.id;
        const { data } = await getCustomer(customerId);
        this.setState({ data });
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

  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.history.push("/customers");
  };

  render() {
    return (
      <div className="content">
        <h1>Customer Details</h1>
        <form onSubmit={this.handleSubmit}>

          <div className="form-group">
              <label  className="form-control"> Name :                 {this.state.data["Name"]}
              </label>
          </div>
          <div className="form-group">
              <label  className="form-control"> DOB :                 {this.state.data["DOB"].substring(0, 10)}
              </label>
          </div>
          <div className="form-group">
              <label  className="form-control"> Email :                 {this.state.data["Email"]}
              </label>
          </div>
          <div className="form-group">
              <label  className="form-control"> Password :                 {this.state.data["Password"]}
              </label>
          </div>
          <div className="form-group">
              <label  className="form-control"> Phone :                 {this.state.data["Phone"]}
              </label>
          </div>
          <div className="form-group">
              <label  className="form-control"> Selected Order : 
                  {this.state.Orders.map(Order => 
                      this.state.data["OrderIds"].includes(Order._id) ? " "+ Order.OrderName+"," : ""
                  )}
              </label>
          </div>
           <button className="btn btn-primary custom-btn">OK</button>

        </form>
      </div>
    );
  }
}

export default CustomerDetails;