import React, { Component } from "react";import { getCategory } from "../services/categoryService";

class CategoryDetails extends Component{

  state = {
    data: { CatName: "", Type: "", },
    errors: {}
  };

  async populateForm() {
    try {
        const categoryId = this.props.match.params.id;
        const { data } = await getCategory(categoryId);
        this.setState({ data });
    } 
    catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found"); 
      }
    }
  }

  async componentDidMount() {
    await this.populateForm();
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.history.push("/categorys");
  };

  render() {
    return (
      <div className="content">
        <h1>Category Details</h1>
        <form onSubmit={this.handleSubmit}>

          <div className="form-group">
              <label  className="form-control"> CatName :                 {this.state.data["CatName"]}
              </label>
          </div>
          <div className="form-group">
              <label  className="form-control"> Type :                 {this.state.data["Type"]}
              </label>
          </div>
           <button className="btn btn-primary custom-btn">OK</button>

        </form>
      </div>
    );
  }
}

export default CategoryDetails;