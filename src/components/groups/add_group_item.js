import React, { Component } from 'react';
import Timestamp from "react-timestamp";
import Modal from "react-modal";
import Calendar from "react-calendar";

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
    width: "500",
  }
};

const AddGroupItem = ({
  isOpen,
  callback,
  submit,
  date,
  changePlannedDate,
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
          <h1 className="h1_modal_selected_user">Create a new group</h1>
          <div className="form-group">
            <label>Planned date </label>
            <Calendar onChange={changePlannedDate} value={date} />{" "}
          </div>
          <div className="form-group">
            <label>Country </label>
            <input
              className="form-control"
              type="text"
              onChange={changeCountry}
            />{" "}
          </div>
          <div className="form-group">
            <label>City </label>
            <input
              className="form-control"
              type="text"
              onChange={changeCity}
            />{" "}
          </div>
          <div className="form-group">
            <label>Allowed members </label>
            <input
              className="form-control"
              type="text"
              onChange={changeAllowedMembers}
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

export default AddGroupItem;
