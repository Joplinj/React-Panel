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
    backgroundColor: "rgba(0,0,0, .7)"
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    border: 0,
    width: 500,
    backgroundColor: "#1e7b91"
  }
};

const AddGroupItem = ({
  isOpen,
  allowedMembers,
  city,
  country,
  callback,
  submit,
  isCalendarVisible,
  toogleCalendarVisible,
  plannedDate,
  isErrorVisible,
  errorMessage
}) => {
  const cn = location.search.indexOf("cn") !== -1;
  const now = moment();
  if (cn) {
    now.locale("zh-cn").utcOffset(8);
  } else {
    now.locale("en-gb").utcOffset(0);
  }

  const defaultCalendarValue = now.clone();
  defaultCalendarValue.add(-1, "month");

  return (
    <Modal
      isOpen={isOpen}
      style={modalGroupStyle}
      shouldCloseOnOverlayClick={true}
      onRequestClose={callback}
    >
      <h1 className="h1_modal_selected_group">Create group</h1>
      <div className="containers_form_manage">
        <form onSubmit={submit}>
          <div className="form-group">
            <label>Choose a date </label>{" "}
            <span
              onClick={toogleCalendarVisible}
              className="glyphicon glyphicon-calendar "
            />
            {isCalendarVisible && (
              <div className="container_calendar">
                <FullCalendar
                  onSelect={plannedDate}
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
              className="form-control group_manage_input"
              type="text"
              onChange={country}
            />{" "}
          </div>
          <div className="form-group">
            <label>City </label>
            <input
              className="form-control group_manage_input"
              type="text"
              onChange={city}
            />{" "}
          </div>
          <div className="form-group">
            <label>Allowed members </label>
            <input
              className="form-control group_manage_input"
              type="text"
              onChange={allowedMembers}
            />{" "}
          </div>
          <div className="error_message_add_group">
            {isErrorVisible && errorMessage}
          </div>
          <div className="button_manage_modal">
            <button onClick={callback} value="Cancel" className="btn btn-light">
              Cancel
            </button>
            <input type="submit" value="Save" className="btn btn-light" />
          </div>
        </form>
      </div>
    </Modal>
  );
};

AddGroupItem.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  allowedMembers: PropTypes.func.isRequired,
  city: PropTypes.func.isRequired,
  country: PropTypes.func.isRequired,
  callback: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  isCalendarVisible: PropTypes.bool.isRequired,
  toogleCalendarVisible: PropTypes.func.isRequired,
  plannedDate: PropTypes.func.isRequired,
  isErrorVisible: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
};

export default AddGroupItem;
