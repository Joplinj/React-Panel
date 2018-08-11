import React, { Component } from "react";
import { db } from "../firebase_config";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usercount: "",
      groupcount: ""
    };
  }

  componentDidMount() {
    db.collection("user")
      .get()
      .then(userlist => {
        this.setState({ usercount: userlist.size }, () => {
          console.log(this.state.usercount);
        });
      });

    db.collection("group")
      .get()
      .then(grouplist => {
        this.setState({ groupcount: grouplist.size }, () => {
          console.log(this.state.groupcount);
        });
      });
  }
  render() {
    return (
      <div>
        <div className="dashboard_container_title">
          <h1 className="dashboard_title">Dashboard</h1>
          <p>Welcome to your admin panel</p>
        </div>
        <div className="container_stats_dashboard">
          <div className="col-md-6">
            <div className="bloc_stats_dashboard users">
              <span>{this.state.usercount}</span>
              <p>Users</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="bloc_stats_dashboard groups">
              <span>{this.state.groupcount}</span>
              <p>Groups</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
