import React from "react";
import Timestamp from "react-timestamp";
import Modal from "react-modal";
import PropTypes from "prop-types";

Modal.setAppElement(".container_body");

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

const ManageUserItem = ({
  isOpen,
  id,
  email,
  country,
  city,
  subscribe,
  callback,
  submit,
  changeEmail,
  changeCountry,
  changeCity,
  deleteUser
}) => {
  return (
    <Modal
      isOpen={isOpen}
      style={modalUserStyle}
      shouldCloseOnOverlayClick={true}
      onRequestClose={callback}
    >
      <h1 className="h1_modal_selected_user">Manage user '{id}'</h1>
      <div className="containers_form_manage">
        <form onSubmit={submit}>
          <div className="form-group">
            <label>Email :</label>
            <input
              className="form-control user_manage_input"
              type="text"
              onChange={changeEmail}
              defaultValue={email ? email : ""}
            />{" "}
          </div>
          <div className="form-group">
            <label>Country :</label>
            <input
              className="form-control user_manage_input"
              type="text"
              onChange={changeCountry}
              defaultValue={country ? country : ""}
            />{" "}
          </div>
          <div className="form-group">
            <label>City :</label>
            <input
              className="form-control user_manage_input"
              type="text"
              onChange={changeCity}
              defaultValue={city ? city : ""}
            />{" "}
          </div>
          <div className="form-group">
            <label>Member since :</label>
            <Timestamp time={subscribe} format="full" />
          </div>
          <div className="button_manage_modal">
            <input type="submit" value="Save" className="btn btn-light" />
            <button onClick={callback} value="Save" className="btn btn-light">
              Cancel
            </button>
            <button
              onClick={deleteUser}
              value="Delete"
              className="btn_delete btn btn-light"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

ManageUserItem.propTypes = {
  email: PropTypes.string,
  subscribe: PropTypes.number,
  country: PropTypes.string,
  city: PropTypes.string,
  id: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  callback: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  changeEmail: PropTypes.func.isRequired,
  changeCountry: PropTypes.func.isRequired,
  changeCity: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired
};

export default ManageUserItem;
