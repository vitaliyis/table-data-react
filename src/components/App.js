import React from "react";
import { connect } from "react-redux";
import TableContainer from "./Table/TableContainer";
import { getDataBig, getDataSmall } from "../redux/actions/actions";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <h1 className="text-center">Table</h1>
        <div>
          <button
            type="button"
            className="btn btn-primary mr-3"
            // className={`btn btn-primary mr-3 ${this.props.isLoading ? "disabled" : null} `}
            onClick={this.props.getDataSmall}
            disabled={this.props.isLoading}
          >
            Small Data
          </button>
          <button
            type="button"
            className="btn btn-secondary mr-3"
            onClick={this.props.getDataBig}
            disabled={this.props.isLoading}
          >
            Big Data
          </button>
        </div>

        <div className="mt-3 text-center">
          <TableContainer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.getDataReducer.isLoading
  };
};

const mapDispatchToProps = { getDataSmall, getDataBig };

export default connect(mapStateToProps, mapDispatchToProps)(App);
