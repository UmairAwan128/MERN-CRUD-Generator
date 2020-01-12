import React, { Component } from "react";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../services/productService";

class Products extends Component{
  state = {
    records: [],
    pageSize: 5,
    currentPage: 1
  };

  async componentDidMount() {
    const { data:products } = await getProducts();
    this.setState({ records:products });
  }

  handleDelete = async id => {
    const allproducts = this.state.records; 
    const products = allproducts.filter(m => m._id !== id);
    this.setState({ records:products });
    try {
      await deleteProduct(id);
      console.log("Record Successfully deleted.");
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
         console.log("The record has already been deleted");
      }
      this.setState({ records: allproducts });
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

    const { totalCount, data: paginatedProducts } = this.getPagedData();

    return (
      <React.Fragment>
            <div className="row mt-4">
              <div className="col-sm-5">
                    <Link
                      to="/products/new"
                      className="btn btn-primary custom-btn"
                      style={{ marginBottom: 20 }}
                    >
                     New Product
                    </Link>
              </div>
              { (totalCount === 0)?
                <div className="col-sm-4">
                   <p>There are no records to show create a record</p>
                </div>
                : 
                <div className="col-sm-2">
                   <p>There are {totalCount} products</p>
                </div>
              }
          </div>
            <div className="table-responsive">

              <table className="table">
                <thead>
                    <tr>
                    <th scope="col" key="1" style={{ cursor: "pointer" }}>
                      Price
                    </th>
                    <th scope="col" key="2" style={{ cursor: "pointer" }}>
                      Quantity
                    </th>
                    <th scope="col" key="3" style={{ cursor: "pointer" }}>
                      ProdName
                    </th>
                    <th scope="col" key="4" style={{ cursor: "pointer" }}>
                      Category
                    </th>
                    <th scope="col" key="5" style={{ cursor: "pointer" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProducts.map(record => (
                    <tr key={record._id}>
                      <td key="1">{record.Price}</td>
                      <td key="2">{record.Quantity}</td>
                      <td key="3">{record.ProdName}</td>
                      <td key="4">{record.Category.Name}</td>
                      <td key="5">
                              <Link
                                to={`/viewproduct/${record._id}`}
                                className="btn btn-info btn-sm m-1"
                                >
                                View
                              </Link>
                              <Link
                                to={`/products/${record._id}`}
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
export default Products;
