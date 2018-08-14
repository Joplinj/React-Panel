import React from "react";
import Timestamp from "react-timestamp";
import Modal from "react-modal";
import PropTypes from "prop-types";

Modal.setAppElement(".container_body");

// The global modal style
const modalUserStyle = {
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
    backgroundColor: "#f25732"
  }
};

const AddUserItem = ({
  isOpen,
  email,
  city,
  country,
  callback,
  submit,
  isErrorVisible,
  errorMessage
}) => {

  return (
    <Modal
      isOpen={isOpen}
      style={modalUserStyle}
      shouldCloseOnOverlayClick={true}
      onRequestClose={callback}
    >
      <h1 className="h1_modal_selected_user">Create user</h1>
      <div className="containers_form_manage">
        <form onSubmit={submit}>
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control user_manage_input"
              type="text"
              onChange={email}
            />{" "}
          </div>
          <div className="form-group">
            <label>Country </label>
            <input className="form-control user_manage_input" type="text" onChange={country} />{" "}
          </div>
          <div className="form-group">
            <label>City </label>
            <input
              className="form-control user_manage_input"
              type="text"
              onChange={city}
            />{" "}
          </div>
          <div className="error_message_add_user">
            {isErrorVisible && errorMessage}
          </div>
          <div className="button_manage_modal">
            <button onClick={callback} value="Save" className="btn btn-light">
              Cancel
            </button>
            <input type="submit" value="Save" className="btn btn-light" />
          </div>
        </form>
      </div>
    </Modal>
  );
};

AddUserItem.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  email: PropTypes.func.isRequired,
  city: PropTypes.func.isRequired,
  country: PropTypes.func.isRequired,
  callback: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  isErrorVisible: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
};

export default AddUserItem;
