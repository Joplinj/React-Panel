import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import UserItem from "../components/users/user_item";
import { db } from "../components/firebase_config";
import ManageUserItem from "../components/users/manage_user_item";
import AddUserItem from "../components/users/add_user_item";
import PreloaderIcon from "react-preloader-icon";
import Puff from "react-preloader-icon/loaders/Puff";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userlist: [],
      loading: true,
      selecteduser: {},
      selecteduserChange: [],
      IsModalUserVisible: false,
      IsModalAddUserVisible: false,
      timeSelectedUser: 0,
      countryFilter: "", // Contain the country clicked
      userlistcountry: [], // Contain the user list sorted by country clicked
      IsErrorMsgAddUserVisible: false,
      errorMessage: "",
      newUser: { country: "", city: "", email: "", subscribe_date: "" }
    };
  }

  componentDidMount() {
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

  // If a country is clicked, store the new user list sorted by country in the state grouplistcountry
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
    this.ChangeSaved();
  }

  handleDeleteSelectedUser() {
    const idDeleteUser = this.state.selecteduser.id;
    db.collection("user")
      .doc(idDeleteUser)
      .delete();

    this.ReloadDbCall();
  }

  handleNewCountry(event) {
    event.preventDefault();
    const NewUser = this.state.newUser;
    NewUser.country = event.target.value;
    this.setState({
      newUser: NewUser
    });
  }

  handleNewEmail(event) {
    event.preventDefault();
    const NewUser = this.state.newUser;
    NewUser.email = event.target.value;
    this.setState({
      newUser: NewUser
    });
  }

  handleNewCity(event) {
    event.preventDefault();
    const NewUser = this.state.newUser;
    NewUser.city = event.target.value;
    this.setState({
      newUser: NewUser
    });
  }

  handleSubmitNewUser(event) {
    event.preventDefault();
    const newUser = this.state.newUser;
    newUser.subscribe_date = new Date();
    if (
      newUser.subscribe_date != "" &&
      newUser.email != "" &&
      newUser.country != "" &&
      newUser.city != ""
    ) {
      db.collection("user")
        .doc()
        .set(newUser);
      this.CloseAddUserModal();
      this.setState({ loading: true });
      this.ReloadDbCall();
    } else {
      this.setState({
        IsErrorMsgAddUserVisible: true,
        errorMsgAddUser:
          "One of those fields is empty, please complete all fields"
      });
    }
  }

  ReloadDbCall() {
    db.collection("user")
      .get()
      .then(collection => {
        this.setState({
          userlist: collection.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          })),
          userlistcountry: collection.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          })),
          loading: false
        });
        this.changeUserListSorted.bind(this);
      });
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
    const newSelectedUser = this.state.userlistcountry.find(
      user => user.id == idSelectedUser
    );
    newSelectedUser.email = email;
    newSelectedUser.country = country;
    newSelectedUser.city = city;
    this.setState({ selecteduser: newSelectedUser });
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

  CloseAddUserModal() {
    this.setState({
      IsModalAddUserVisible: false
    });
  }

  OpenModalAddUser() {
    this.setState({
      IsModalAddUserVisible: true,
      newUser: { country: "", city: "", email: "", subscribe_date: 0 },
      IsErrorMsgAddUserVisible: false
    });
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

          <div>
            <button
              onClick={() => this.OpenModalAddUser()}
              className="btn btn-success"
            >
              Add User
            </button>
          </div>
        </div>
        <div className="table_list">
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
            <table className="table table-hover list">
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
                      key={userItem.id}
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
              deleteUser={this.handleDeleteSelectedUser.bind(this)}
            />
          }
          {
            <AddUserItem
              isOpen={this.state.IsModalAddUserVisible}
              email={this.handleNewEmail.bind(this)}
              country={this.handleNewCountry.bind(this)}
              city={this.handleNewCity.bind(this)}
              callback={() => this.CloseAddUserModal()}
              submit={this.handleSubmitNewUser.bind(this)}
              isErrorVisible={this.state.IsErrorMsgAddUserVisible}
              errorMessage={this.state.errorMsgAddUser}
            />
          }
        </div>
      </div>
    );
  }
}
export default Users;
