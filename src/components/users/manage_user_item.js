import React from "react";
import Timestamp from "react-timestamp";
import Modal from "react-modal";
import PropTypes from "prop-types";

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
    padding: 20,
    width: 500
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
          <tbody>
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
          </tbody>
        </table>
        <div className="submit_manage_modal">
          <input type="submit" value="Save" className="btn btn-success" />
        </div>
      </form>
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
  changeCity: PropTypes.func.isRequired
};

export default ManageUserItem;
