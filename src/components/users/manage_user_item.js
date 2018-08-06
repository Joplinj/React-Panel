import React from "react";
import Timestamp from "react-timestamp";
import Modal from "react-modal";

Modal.setAppElement(".container_body");

const modalUserStyle = {
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
  changeCity
}) => {
  return (
    <Modal
      isOpen={isOpen}
      style={modalUserStyle}
      shouldCloseOnOverlayClick={true}
      onRequestClose={callback}
    >
      <form onSubmit={submit}>
        <h1 className="h1_modal_selected_user">Manage user '{id}'</h1>
        <table className="table_manage_user">
          <tr>
            <th>Email :</th>
            <td>
              <input
                className="form-control"
                type="text"
                onChange={changeEmail}
                defaultValue={email ? email : ""}
              />{" "}
            </td>
          </tr>
          <tr>
            <th>Country :</th>
            <td>
              <input
                className="form-control"
                type="text"
                onChange={changeCountry}
                defaultValue={country ? country : ""}
              />{" "}
            </td>
          </tr>
          <tr>
            <th>City :</th>
            <td>
              <input
                className="form-control"
                type="text"
                onChange={changeCity}
                defaultValue={city ? city : ""}
              />{" "}
            </td>
          </tr>
          <tr>
            <th>Member since :</th>
            <td>
              <Timestamp time={subscribe} format="full" />
            </td>
          </tr>
        </table>
        <div className="submit_manage_modal">
          <input type="submit" value="Save" className="btn btn-success" />
        </div>
      </form>
    </Modal>
  );
};

export default ManageUserItem;
