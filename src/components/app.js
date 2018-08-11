import React, { Component } from "react";
import ReactDOM from "react-dom";
import Header from "./header/header";
import Dashboard from "./dashboard/dashboard";
import Users from "../containers/users";
import Groups from "../containers/groups";
import { connect } from "react-redux";

class App extends Component {
  render() {
    const renderPageContent = () => {
      if (this.props.activePage === "Dashboard") {
        return <Dashboard />;
      }
      if (this.props.activePage === "Users") {
        return <Users />;
      }
      if (this.props.activePage === "Groups") {
        return <Groups />;
      }
      if (this.props.activePage === "Statistics") {
        return <Statistics />;
      }
    };
    return (
      <div>
        <div>
          <Header />
        </div>
        <div className="body_content">{renderPageContent()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activePage: state.activePage
  };
}
export default connect(mapStateToProps)(App);
