import React, { Component } from "react";import { getStatus } from "../services/statusService";

class StatusDetails extends Component{

  state = {
    data: { StatName: "", },
    errors: {}
  };

  async populateForm() {
    try {
        const statusId = this.props.match.params.id;
        const { data } = await getStatus(statusId);
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
    this.props.history.push("/statuss");
  };

  render() {
    return (
      <div className="content">
        <h1>Status Details</h1>
        <form onSubmit={this.handleSubmit}>

          <div className="form-group">
              <label  className="form-control"> StatName :                 {this.state.data["StatName"]}
              </label>
          </div>
           <button className="btn btn-primary custom-btn">OK</button>

        </form>
      </div>
    );
  }
}

export default StatusDetails;