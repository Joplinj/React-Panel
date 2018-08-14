import React, { Component } from "react";
import { db } from "../components/firebase_config";

import PreloaderIcon from "react-preloader-icon";
import Puff from "react-preloader-icon/loaders/Puff";

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  DiscreteColorLegend
} from "react-vis";

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userlist: {},
      grouplist: {},
      userDateList: [],
      groupDateList: [],
      loading: true
    };
  }

  componentDidMount() {
    db.collection("user")
      .get()
      .then(collection => {
        this.setState(
          {
            userlist: collection.docs.map(doc => doc.data())
          },
          () => {
            this.setState({
              userDateList: this.state.userlist.map(
                user => user.subscribe_date.seconds
              ),
              loading: false
            });
          }
        );
      });

    db.collection("group")
      .get()
      .then(collection => {
        this.setState(
          {
            grouplist: collection.docs.map(doc => doc.data())
          },
          () => {
            this.setState({
              groupDateList: this.state.grouplist.map(
                group => group.date.seconds
              ),
              loading: false
            });
          }
        );
      });
  }

  addDays(startDate, numberOfDays) {
    return startDate + numberOfDays * 24 * 60 * 60 * 1000;
  }

  GetOrderedUserDateList(days) {
    if (days) {
      const timestamp = Date.now();
      const ONE_DAY = 86400000;
      const from = timestamp - days * ONE_DAY + ONE_DAY * 2;
      const to = timestamp - days * ONE_DAY;
      const dateOrdered = this.state.userDateList.filter(
        date => date * 1000 > to && date * 1000 < from
      );
      const dateOrderedCount = dateOrdered.length;
      return dateOrderedCount;
    }
  }

  GetOrderedGroupDateList(days) {
    if (days) {
      const timestamp = Date.now();
      const ONE_DAY = 86400000;
      const from = timestamp - days * ONE_DAY + ONE_DAY * 2;
      const to = timestamp - days * ONE_DAY;
      const dateOrdered = this.state.groupDateList.filter(
        date => date * 1000 > to && date * 1000 < from
      );
      const dateOrderedCount = dateOrdered.length;
      return dateOrderedCount;
    }
  }

  render() {
    const timestamp = Date.now();
    const ONE_DAY = 86400000;

    const USER_DATA = [
      { x0: ONE_DAY * 0, x: ONE_DAY * 2, y: 2 },
      { x0: ONE_DAY * 2, x: ONE_DAY * 4, y: 4 },
      { x0: ONE_DAY * 4, x: ONE_DAY * 6, y: 6 },
      { x0: ONE_DAY * 6, x: ONE_DAY * 8, y: 8 },
      { x0: ONE_DAY * 8, x: ONE_DAY * 10, y: 10 },
      { x0: ONE_DAY * 10, x: ONE_DAY * 12, y: 12 },
      { x0: ONE_DAY * 12, x: ONE_DAY * 14, y: 14 },
      { x0: ONE_DAY * 14, x: ONE_DAY * 16, y: 16 },
      { x0: ONE_DAY * 16, x: ONE_DAY * 18, y: 18 },
      { x0: ONE_DAY * 18, x: ONE_DAY * 20, y: 20 },
      { x0: ONE_DAY * 20, x: ONE_DAY * 22, y: 22 },
      { x0: ONE_DAY * 22, x: ONE_DAY * 24, y: 24 },
      { x0: ONE_DAY * 24, x: ONE_DAY * 26, y: 26 },
      { x0: ONE_DAY * 26, x: ONE_DAY * 28, y: 28 },
      { x0: ONE_DAY * 28, x: ONE_DAY * 30, y: 30 }
    ].map(el => ({
      x0: timestamp - el.x0 + ONE_DAY,
      x: timestamp - el.x + ONE_DAY,
      y: this.GetOrderedUserDateList(el.y)
    }));

    const GROUP_DATA = [
      { x0: ONE_DAY * 0, x: ONE_DAY * 2, y: 2 },
      { x0: ONE_DAY * 2, x: ONE_DAY * 4, y: 4 },
      { x0: ONE_DAY * 4, x: ONE_DAY * 6, y: 6 },
      { x0: ONE_DAY * 6, x: ONE_DAY * 8, y: 8 },
      { x0: ONE_DAY * 8, x: ONE_DAY * 10, y: 10 },
      { x0: ONE_DAY * 10, x: ONE_DAY * 12, y: 12 },
      { x0: ONE_DAY * 12, x: ONE_DAY * 14, y: 14 },
      { x0: ONE_DAY * 14, x: ONE_DAY * 16, y: 16 },
      { x0: ONE_DAY * 16, x: ONE_DAY * 18, y: 18 },
      { x0: ONE_DAY * 18, x: ONE_DAY * 20, y: 20 },
      { x0: ONE_DAY * 20, x: ONE_DAY * 22, y: 22 },
      { x0: ONE_DAY * 22, x: ONE_DAY * 24, y: 24 },
      { x0: ONE_DAY * 24, x: ONE_DAY * 26, y: 26 },
      { x0: ONE_DAY * 26, x: ONE_DAY * 28, y: 28 },
      { x0: ONE_DAY * 28, x: ONE_DAY * 30, y: 30 }
    ].map(el => ({
      x0: timestamp - el.x0 + ONE_DAY,
      x: timestamp - el.x + ONE_DAY,
      y: this.GetOrderedGroupDateList(el.y)
    }));

    return (
      <div>
        <div className="dashboard_container_title">
          <h1 className="dashboard_title">Statistics</h1>
          <p>Check all data</p>
        </div>
        {this.state.loading ? (
          <div className="container_preloader">
            <div className="container_preloader_center">
              <PreloaderIcon
                loader={Puff}
                size={80}
                strokeWidth={5}
                strokeColor="#006064"
                duration={900}
              />
            </div>
          </div>
        ) : (
          <div className="container_stats_dashboard">
            <div className="stats_users">
              <h4>Last 30 days data</h4>
              <div className="col-md-9">
                <XYPlot
                  xType="time"
                  xDomain={[timestamp - 30 * ONE_DAY, timestamp]}
                  yDomain={[
                    0,
                    this.state.userDateList.filter(
                      date => date * 1000 > timestamp - 30 * ONE_DAY
                    ).length
                  ]}
                  width={1000}
                  height={300}
                  xDistance={1}
                >
                  <VerticalGridLines />
                  <HorizontalGridLines />
                  <XAxis tickTotal={8} />
                  <YAxis title="Subscribtions / Group meeting" />
                  <VerticalBarSeries
                    className="vertical-bar-series-example"
                    data={USER_DATA}
                    color="#cc4726"
                  />
                  <VerticalBarSeries
                    className="vertical-bar-series-example"
                    data={GROUP_DATA}
                    color="#17687a"
                  />
                </XYPlot>
              </div>
              <div className="col-md-3">
                <div className="legend_stats">
                  <span className="glyphicon glyphicon-minus orange" />
                  <p>New users</p>
                  <br />
                  <span className="glyphicon glyphicon-minus blue" />
                  <p>Groups meeting</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Statistics;
