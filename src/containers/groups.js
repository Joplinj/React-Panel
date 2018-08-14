import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import GroupItem from "../components/groups/group_item";
import { db } from "../components/firebase_config";
import ManageGroupItem from "../components/groups/manage_group_item";
import AddGroupItem from "../components/groups/add_group_item";
import PreloaderIcon from "react-preloader-icon";
import Puff from "react-preloader-icon/loaders/Puff";
class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grouplist: [], // Array contain list of all groups in database
      loading: true,
      selectedgroup: {}, // Array contain only the group clicked
      selectedgroupChange: [], // Array contain the group clicked with changes
      IsModalGroupVisible: false,
      IsCalendarModalGroupVisible: false,
      IsModalAddGroupVisible: false,
      timeSelectedGroup: { seconds: 0 }, // Timestamp of selected user stored here
      countryFilter: "", // Contain the country clicked
      grouplistcountry: [], // Contain the group list sorted by country clicked
      plannedDateChange: { seconds: 0 },
      newGroup: { country: "", city: "", allowed_members: 0, date: "" },
      IsErrorMsgAddGroupVisible: false,
      errorMsgAddGroup: ""
    };
  }

  componentDidMount() {
    db.collection("group")
      .get()
      .then(collection => {
        this.setState({
          grouplist: collection.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          })),
          grouplistcountry: collection.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          })),
          loading: false
        });
        this.changeGroupListSorted.bind(this);
      });
  }

  // If a country is clicked, store the new group list sorted by country in the state grouplistcountry
  changeGroupListSorted() {
    if (
      this.state.countryFilter &&
      this.state.countryFilter != "All Countries"
    ) {
      const groupListFilter = this.state.grouplist.filter(
        group => group.country == this.state.countryFilter
      );
      this.setState({ grouplistcountry: groupListFilter });
    } else if (this.state.countryFilter == "All Countries") {
      this.setState({ grouplistcountry: this.state.grouplist });
    }
  }

  // Store news values of the selected group in state selectedgroupChange, ready to send in the database
  handleChangeAllowedMembers(event) {
    event.preventDefault();
    const selectedGroupAllowedMembers = this.state.selectedgroupChange;
    selectedGroupAllowedMembers.allowed_members = parseInt(event.target.value);
    this.setState({
      selectedgroupChange: selectedGroupAllowedMembers
    });
  }

  // Store news values of the selected group in state selectedgroupChange, ready to send in the database
  handleChangeCountry(event) {
    event.preventDefault();
    const selectedGroupUpdate = this.state.selectedgroupChange;
    selectedGroupUpdate.country = event.target.value;
    this.setState({
      selectedgroupChange: selectedGroupUpdate
    });
  }

  // Store news values of the selected group in state selectedgroupChange, ready to send in the database
  handleChangeCity(event) {
    event.preventDefault();
    const selectedGroupUpdate = this.state.selectedgroupChange;
    selectedGroupUpdate.city = event.target.value;
    this.setState({
      selectedgroupChange: selectedGroupUpdate
    });
  }

  PlannedDateChanged(value) {
    if (value) {
      const newDate = { seconds: value._d.getTime() / 1000 };
      this.setState({ plannedDateChange: newDate });
      this.ToogleCalendarVisibility();
    }
  }

  // Called when the save button is clicked. Send the selected group with changes in the database
  handleSubmit(event) {
    event.preventDefault();
    db.collection("group")
      .doc(this.state.selectedgroup.id)
      .update({
        allowed_members: this.state.selectedgroupChange.allowed_members,
        country: this.state.selectedgroupChange.country,
        city: this.state.selectedgroupChange.city,
        date: new Date(this.state.plannedDateChange.seconds * 1000)
      });
    this.CloseGroupModal();
    this.setState({ loading: true });
    this.ChangeSaved();
  }

  handleDeleteSelectedGroup() {
    const idDeleteGroup = this.state.selectedgroup.id;
    db.collection("group")
      .doc(idDeleteGroup)
      .delete();

    this.ReloadDbCall();
  }

  handleNewAllowedMembers(event) {
    event.preventDefault();
    const NewGroup = this.state.newGroup;
    NewGroup.allowed_members = parseInt(event.target.value);
    this.setState({
      newGroup: NewGroup
    });
  }

  handleNewCountry(event) {
    event.preventDefault();
    const NewGroup = this.state.newGroup;
    NewGroup.country = event.target.value;
    this.setState({
      newGroup: NewGroup
    });
  }

  handleNewCity(event) {
    event.preventDefault();
    const NewGroup = this.state.newGroup;
    NewGroup.city = event.target.value;
    this.setState({
      newGroup: NewGroup
    });
  }

  PlannedDateNewGroup(value) {
    const newDate = new Date(value._d.getTime());
    const NewGroup = this.state.newGroup;
    NewGroup.date = newDate;
    this.setState({ newGroup: NewGroup });
    this.ToogleCalendarVisibility();
  }

  handleSubmitNewGroup(event) {
    event.preventDefault();
    const newGroup = this.state.newGroup;
    if (
      newGroup.date != "" &&
      newGroup.allowed_members != 0 &&
      newGroup.allowed_members != "" &&
      newGroup.country != "" &&
      newGroup.city != ""
    ) {
      db.collection("group")
        .doc()
        .set(newGroup);
      this.CloseAddGroupModal();
      this.setState({ loading: true });
      this.ReloadDbCall();
    } else {
      this.setState({
        IsErrorMsgAddGroupVisible: true,
        errorMsgAddGroup:
          "One of those fields is empty, please complete all fields"
      });
    }
  }

  ReloadDbCall() {
    db.collection("group")
      .get()
      .then(collection => {
        this.setState({
          grouplist: collection.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          })),
          grouplistcountry: collection.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          })),
          loading: false
        });
        this.changeGroupListSorted.bind(this);
      });
  }

  // Store the country clicked in the state countryFilter
  handleCountryFilter(event) {
    this.setState({ countryFilter: event.target.value }, () => {
      this.changeGroupListSorted();
    });
  }

  // Update table with the group list with changes you done on a group
  ChangeSaved() {
    const idSelectedGroup = this.state.selectedgroup.id;
    const allowedMembers = this.state.selectedgroupChange.allowed_members;
    const country = this.state.selectedgroupChange.country;
    const city = this.state.selectedgroupChange.city;
    const date = this.state.plannedDateChange;
    const newSelectedGroup = this.state.grouplistcountry.find(
      group => group.id == idSelectedGroup
    );
    newSelectedGroup.allowed_members = allowedMembers;
    newSelectedGroup.country = country;
    newSelectedGroup.city = city;
    newSelectedGroup.date = date;
    this.setState({ selectedgroup: newSelectedGroup, loading: false });
  }

  // Store the clicked group in state
  GroupSelected(groupItem) {
    this.setState(
      {
        selectedgroup: groupItem,
        IsModalGroupVisible: true,
        selectedgroupChange: groupItem
      },
      () => {
        this.setState({
          timeSelectedGroup: { seconds: this.state.selectedgroup.date.seconds },
          plannedDateChange: { seconds: this.state.selectedgroup.date.seconds }
        });
      }
    );
  }

  CloseGroupModal() {
    this.setState({
      IsModalGroupVisible: false,
      IsCalendarModalGroupVisible: false
    });
  }

  CloseAddGroupModal() {
    this.setState({
      IsModalAddGroupVisible: false,
      IsCalendarModalGroupVisible: false
    });
  }

  OpenModalAddGroup() {
    this.setState({
      IsModalAddGroupVisible: true,
      newGroup: { country: "", city: "", allowed_members: 0, date: "" },
      IsErrorMsgAddGroupVisible: false
    });
  }

  ToogleCalendarVisibility() {
    this.setState(prevState => ({
      IsCalendarModalGroupVisible: !prevState.IsCalendarModalGroupVisible
    }));
  }

  render() {
    return (
      <div>
        <div className="groups_container_title">
          <h1 className="page_title">Groups</h1>
          <p>
            Here you can manage past, and future groups. Check wich member
            participated, and all details
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
              onClick={() => this.OpenModalAddGroup()}
              className="btn btn-success"
            >
              Add Group
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
                  <th>Planned date</th>
                  <th>Country</th>
                  <th>City</th>
                  <th>Allowed members</th>
                </tr>
              </thead>

              <tbody>
                {this.state.grouplistcountry.map(group => {
                  const time = new Date(group.date.seconds * 1000);
                  const groupItem = JSON.parse(JSON.stringify(group));

                  return (
                    <GroupItem
                      callback={() => this.GroupSelected(groupItem)}
                      key={groupItem.id}
                      plannedDate={time}
                      country={groupItem.country}
                      city={groupItem.city}
                      allowedMembers={groupItem.allowed_members}
                    />
                  );
                })}
              </tbody>
            </table>
          )}
          {
            <ManageGroupItem
              isOpen={this.state.IsModalGroupVisible}
              allowedMembers={this.state.selectedgroup.allowed_members}
              country={this.state.selectedgroup.country}
              city={this.state.selectedgroup.city}
              plannedDate={
                this.state.plannedDateChange.seconds != 0
                  ? this.state.plannedDateChange.seconds
                  : this.state.timeSelectedGroup.seconds
              }
              usersIn={this.state.selectedgroup != {} && this.state.selectedgroup.users_in}
              callback={() => this.CloseGroupModal()}
              submit={this.handleSubmit.bind(this)}
              changeAllowedMembers={this.handleChangeAllowedMembers.bind(this)}
              changeCountry={this.handleChangeCountry.bind(this)}
              changeCity={this.handleChangeCity.bind(this)}
              id={this.state.selectedgroup.id}
              isCalendarVisible={this.state.IsCalendarModalGroupVisible}
              toogleCalendarVisible={() => this.ToogleCalendarVisibility()}
              plannedDateChanged={this.PlannedDateChanged.bind(this)}
              deleteGroup={this.handleDeleteSelectedGroup.bind(this)}
            />
          }
          {
            <AddGroupItem
              isOpen={this.state.IsModalAddGroupVisible}
              allowedMembers={this.handleNewAllowedMembers.bind(this)}
              country={this.handleNewCountry.bind(this)}
              city={this.handleNewCity.bind(this)}
              callback={() => this.CloseAddGroupModal()}
              submit={this.handleSubmitNewGroup.bind(this)}
              isCalendarVisible={this.state.IsCalendarModalGroupVisible}
              toogleCalendarVisible={() => this.ToogleCalendarVisibility()}
              plannedDate={this.PlannedDateNewGroup.bind(this)}
              isErrorVisible={this.state.IsErrorMsgAddGroupVisible}
              errorMessage={this.state.errorMsgAddGroup}
            />
          }
        </div>
      </div>
    );
  }
}
export default Groups;
