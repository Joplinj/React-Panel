import React, { Component } from "react";
import { db } from "../firebase_config";
import PreloaderIcon from "react-preloader-icon";
import Puff from "react-preloader-icon/loaders/Puff";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usercount: "",
      groupcount: "",
      loading: true
    };
  }

  componentDidMount() {
    db.collection("user")
      .get()
      .then(userlist => {
        this.setState({ usercount: userlist.size}, () => {});
      });

    db.collection("group")
      .get()
      .then(grouplist => {
        this.setState({ groupcount: grouplist.size, loading: false }, () => {});
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
              <span>
                {this.state.loading ? (
                  <div className="container_small_preloader">
                    <div className="container_preloader_center">
                      <PreloaderIcon
                        loader={Puff}
                        size={60}
                        strokeWidth={5}
                        strokeColor="#fff"
                        duration={900}
                      />
                    </div>
                  </div>
                ) : (
                  this.state.usercount
                )}
              </span>
              <p>Users</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="bloc_stats_dashboard groups">
              <span>
                {this.state.loading ? (
                  <div className="container_small_preloader">
                    <div className="container_preloader_center">
                      <PreloaderIcon
                        loader={Puff}
                        size={60}
                        strokeWidth={5}
                        strokeColor="#fff"
                        duration={900}
                      />
                    </div>
                  </div>
                ) : (
                  this.state.groupcount
                )}
              </span>
              <p>Groups</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
