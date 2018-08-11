import React from "react";
import Timestamp from "react-timestamp";
import Modal from "react-modal";
import PropTypes from "prop-types";

import FullCalendar from "rc-calendar/lib/FullCalendar";
import Select from "rc-select";

import zhCN from "rc-calendar/lib/locale/zh_CN";
import enUS from "rc-calendar/lib/locale/en_US";
import moment from "moment";
import "moment/locale/zh-cn";
import "moment/locale/en-gb";

Modal.setAppElement(".container_body");

// The global modal style
const modalGroupStyle = {
  overlay: {
    backgroundColor: "rgba(0,0,0, .5)"
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 20,
    width: 500
  }
};

const ManageGroupItem = ({
  isOpen,
  id,
  allowedMembers,
  country,
  city,
  plannedDate,
  callback,
  submit,
  changeAllowedMembers,
  changeCountry,
  changeCity,
  isCalendarVisible,
  toogleCalendarVisible,
  plannedDateChanged
}) => {
  const cn = location.search.indexOf("cn") !== -1;
  const now = moment(new Date(plannedDate * 1000));
  if (cn) {
    now.locale("zh-cn").utcOffset(8);
  } else {
    now.locale("en-gb").utcOffset(0);
  }

  console.log(new Date(plannedDate * 1000));

  const defaultCalendarValue = now.clone();
  defaultCalendarValue.add(-1, "month");

  return (
    <Modal
      isOpen={isOpen}
      style={modalGroupStyle}
      shouldCloseOnOverlayClick={true}
      onRequestClose={callback}
    >
      <div className="containers_form_manage">
        <form onSubmit={submit}>
          <h1 className="h1_modal_selected_user">Manage group '{id}'</h1>
          <div className="form-group">
            <label>Planned date </label>{" "}
            <Timestamp time={plannedDate} format="full" />{" "}
            <span
              onClick={toogleCalendarVisible}
              className="glyphicon glyphicon-calendar "
            />
            {isCalendarVisible && (
              <div className="container_calendar">
                <FullCalendar
                  onSelect={plannedDateChanged}
                  showToday={false}
                  formatter="YYYY-MM-DD HH:mm:ss"
                  showOk={false}
                  Select={Select}
                  defaultValue={now}
                  locale={cn ? zhCN : enUS}
                />
              </div>
            )}
          </div>
          <div className="form-group">
            <label>Country </label>
            <input
              className="form-control"
              type="text"
              onChange={changeCountry}
              defaultValue={country ? country : ""}
            />{" "}
          </div>
          <div className="form-group">
            <label>City </label>
            <input
              className="form-control"
              type="text"
              onChange={changeCity}
              defaultValue={city ? city : ""}
            />{" "}
          </div>
          <div className="form-group">
            <label>Allowed members </label>
            <input
              className="form-control"
              type="text"
              onChange={changeAllowedMembers}
              defaultValue={allowedMembers ? allowedMembers : ""}
            />{" "}
          </div>
          <div className="button_manage_modal">
            <button onClick={callback} value="Save" className="btn btn-light">
              Cancel
            </button>
            <input type="submit" value="Save" className="btn btn-success" />
          </div>
        </form>
      </div>
    </Modal>
  );
};

ManageGroupItem.propTypes = {
  allowedMembers: PropTypes.number,
  plannedDate: PropTypes.number,
  country: PropTypes.string,
  city: PropTypes.string,
  id: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  callback: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  changeAllowedMembers: PropTypes.func.isRequired,
  changeCountry: PropTypes.func.isRequired,
  changeCity: PropTypes.func.isRequired,
  isCalendarVisible: PropTypes.bool.isRequired,
  toogleCalendarVisible: PropTypes.func.isRequired,
  plannedDateChanged: PropTypes.func.isRequired
};

export default ManageGroupItem;
