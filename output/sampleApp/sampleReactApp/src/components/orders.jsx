import React, { Component } from "react";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import { getOrders, deleteOrder } from "../services/orderService";

class Orders extends Component{
  state = {
    records: [],
    pageSize: 5,
    currentPage: 1
  };

  async componentDidMount() {
    const { data:orders } = await getOrders();
    this.setState({ records:orders });
  }

  handleDelete = async id => {
    const allorders = this.state.records; 
    const orders = allorders.filter(m => m._id !== id);
    this.setState({ records:orders });
    try {
      await deleteOrder(id);
      console.log("Record Successfully deleted.");
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
         console.log("The record has already been deleted");
      }
      this.setState({ records: allorders });
    }
};


  handlePageChange = pageNo => {
    this.setState({ currentPage: pageNo });
  };

  getPagedData = () => {
    
    const {
      pageSize,
      currentPage,
      records
    } = this.state;
    
    const paginatedRecords = paginate(records, currentPage, pageSize);
    
    return { totalCount: !records.length ? 0 : records.length, data: paginatedRecords };
  
  };

  render() {

    const { totalCount, data: paginatedOrders } = this.getPagedData();

    return (
      <React.Fragment>
            <div className="row mt-4">
              <div className="col-sm-5">
                    <Link
                      to="/orders/new"
                      className="btn btn-primary"
                      style={{ marginBottom: 20 }}
                    >
                     New Order
                    </Link>
              </div>
              { (totalCount === 0)?
                <div className="col-sm-4">
                   <p>There are no records to show create a record</p>
                </div>
                : 
                <div className="col-sm-2">
                   <p>There are {totalCount} orders</p>
                </div>
              }
          </div>
            <div className="table-responsive">

              <table className="table">
                <thead>
                    <tr>
                    <th scope="col" key="1" style={{ cursor: "pointer" }}>
                      OrderName
                    </th>
                    <th scope="col" key="2" style={{ cursor: "pointer" }}>
                      OrderDate
                    </th>
                    <th scope="col" key="3" style={{ cursor: "pointer" }}>
                      Comments
                    </th>
                    <th scope="col" key="4" style={{ cursor: "pointer" }}>
                      Email
                    </th>
                    <th scope="col" key="5" style={{ cursor: "pointer" }}>
                      Password
                    </th>
                    <th scope="col" key="6" style={{ cursor: "pointer" }}>
                      Phone
                    </th>
                    <th scope="col" key="7" style={{ cursor: "pointer" }}>
                      User
                    </th>
                    <th scope="col" key="8" style={{ cursor: "pointer" }}>
                      Status
                    </th>
                    <th scope="col" key="9" style={{ cursor: "pointer" }}>
                      Selected Products
                    </th>
                    <th scope="col" key="10" style={{ cursor: "pointer" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOrders.map(record => (
                    <tr key={record._id}>
                      <td key="1">{record.OrderName}</td>
                      <td key="2">{record.OrderDate}</td>
                      <td key="3">{record.Comments}</td>
                      <td key="4">{record.Email}</td>
                      <td key="5">{record.Password}</td>
                      <td key="6">{record.Phone}</td>
                      <td key="7">{record.User.name}</td>
                      <td key="8">{record.Status.Name}</td>
                      <td key="9">{record.Products.length}</td>
                      <td key="10">
                              <Link
                                to={`/orders/${record._id}`}
                                className="btn btn-warning btn-sm m-1"
                                >
                                Update
                              </Link>
                            <button
                              onClick={() => this.handleDelete(record._id)}
                              className="btn btn-danger btn-sm m-1"
                              >
                              Delete
                            </button>
                       </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          
            <Pagination
              itemsCount={totalCount}
              pageSize={this.state.pageSize}
              onPageChange={this.handlePageChange}
              currentPage={this.state.currentPage}
            />
      </React.Fragment>
    );
  }
}
export default Orders;
