import React from "react";
import Timestamp from "react-timestamp";
import Modal from "react-modal";

Modal.setAppElement(".container_body");

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
    padding: "20",
    width: "500"
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
  changeCity
}) => {
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
            <Timestamp time={plannedDate} format="full" />
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
            <button onClick={callback} value="Save" className="btn btn-light">Cancel</button>
            <input type="submit" value="Save" className="btn btn-success" />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ManageGroupItem;
