import React, {Component} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import UserItem from "../components/users/user_item";
import { db } from "../components/firebase_config";
import ManageUserItem from "../components/users/manage_user_item";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userlist: [],
      loading: true,
      selecteduser: {},
      selecteduserChange: [],
      IsModalUserVisible: false,
      timeSelectedUser: "",
      countryFilter: "", // Contain the country clicked
      userlistcountry: [] // Contain the user list sorted by country clicked
    };
  }

  componentWillMount() {
    db.collection("user")
      .get()
      .then(collection => {
        this.setState({
          userlist: collection.docs.map(doc => ({ ...doc.data(), id: doc.id })),
          userlistcountry: collection.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          })),
          loading: false
        });
      });
  }

  // If a country is clicked, store the new group list sorted by country in the state grouplistcountry
  changeUserListSorted() {
    if (
      this.state.countryFilter &&
      this.state.countryFilter != "All Countries"
    ) {
      const userListFilter = this.state.userlist.filter(
        user => user.country == this.state.countryFilter
      );
      this.setState({ userlistcountry: userListFilter });
    } else if (this.state.countryFilter == "All Countries") {
      this.setState({ userlistcountry: this.state.userlist });
    }
  }

  handleChangeEmail(event) {
    event.preventDefault();
    const selectedUserUpdate = this.state.selecteduserChange;
    selectedUserUpdate.email = event.target.value;
    this.setState({
      selecteduserChange: selectedUserUpdate
    });
  }

  handleChangeCountry(event) {
    event.preventDefault();
    const selectedUserUpdate = this.state.selecteduserChange;
    selectedUserUpdate.country = event.target.value;
    this.setState({
      selecteduserChange: selectedUserUpdate
    });
  }

  handleChangeCity(event) {
    event.preventDefault();
    const selectedUserUpdate = this.state.selecteduserChange;
    selectedUserUpdate.city = event.target.value;
    this.setState({
      selecteduserChange: selectedUserUpdate
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    db.collection("user")
      .doc(this.state.selecteduser.id)
      .update({
        email: this.state.selecteduserChange.email,
        country: this.state.selecteduserChange.country,
        city: this.state.selecteduserChange.city
      });
    this.CloseUserModal();
    this.setState({ loading: true });
    this.ChangeSaved();
  }

  // Store the country clicked in the state countryFilter
  handleCountryFilter(event) {
    this.setState({ countryFilter: event.target.value }, () => {
      this.changeUserListSorted();
    });
  }

  ChangeSaved() {
    const idSelectedUser = this.state.selecteduser.id;
    const email = this.state.selecteduserChange.email;
    const country = this.state.selecteduserChange.country;
    const city = this.state.selecteduserChange.city;
    const newSelectedUser = this.state.userlist.find(
      user => user.id == idSelectedUser
    );
    newSelectedUser.email = email;
    newSelectedUser.country = country;
    newSelectedUser.city = city;
    this.setState({ selecteduser: newSelectedUser, loading: false });
  }

  UserSelected(userItem) {
    this.setState(
      {
        selecteduser: userItem,
        IsModalUserVisible: true,
        selecteduserChange: userItem
      },
      function() {
        this.setState({
          timeSelectedUser: this.state.selecteduser.subscribe_date.seconds
        });
      }
    );
  }

  CloseUserModal() {
    this.setState({ IsModalUserVisible: false });
  }

  render() {
    return (
      <div>
        <div className="users_container_title">
          <h1 className="page_title">Users</h1>
          <p>
            Here you can manage your users. Create some, delete them, check
            their groups etc ...
          </p>
        </div>
        <div className="filter_bar">
          <div className="col-md-3">
            <select
              name="select-country-filter"
              onChange={this.handleCountryFilter.bind(this)}
              className="select_filter form-control"
            >
              <option>All Countries</option>
              <option>France</option>
              <option>Portugal</option>
              <option>Spain</option>
              <option>Russia</option>
              <option>United States</option>
            </select>
          </div>
        </div>
        <div className="table_list">
          {this.state.loading ? (
            <p>Loading</p>
          ) : (
            <table className="table table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>Email</th>
                  <th>Country</th>
                  <th>City</th>
                  <th>Member since</th>
                </tr>
              </thead>

              <tbody>
                {this.state.userlistcountry.map(user => {
                  const time = user.subscribe_date.seconds;
                  const userItem = JSON.parse(JSON.stringify(user));

                  return (
                    <UserItem
                      callback={() => this.UserSelected(userItem)}
                      key={userItem.email}
                      email={userItem.email}
                      country={userItem.country}
                      city={userItem.city}
                      subscribe={time}
                    />
                  );
                })}
              </tbody>
            </table>
          )}
          {
            <ManageUserItem
              isOpen={this.state.IsModalUserVisible}
              email={this.state.selecteduser.email}
              country={this.state.selecteduser.country}
              city={this.state.selecteduser.city}
              subscribe={this.state.timeSelectedUser}
              callback={() => this.CloseUserModal()}
              submit={this.handleSubmit.bind(this)}
              changeEmail={this.handleChangeEmail.bind(this)}
              changeCountry={this.handleChangeCountry.bind(this)}
              changeCity={this.handleChangeCity.bind(this)}
              id={this.state.selecteduser.id}
            />
          }
        </div>
      </div>
    );
  }
}
export default Users;
