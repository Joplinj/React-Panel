import React from "react";
import Timestamp from "react-timestamp";
import PropTypes from "prop-types";

const UserItem = ({ email, country, city, subscribe, callback }) => {
  return (
    <tr onClick={callback}>
      <td>{email}</td>
      <td>{country}</td>
      <td>{city}</td>
      <td>
        <Timestamp time={subscribe} format="ago" />
      </td>
    </tr>
  );
};

UserItem.propTypes = {
  subscribe: PropTypes.number.isRequired,
  country: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired
}

export default UserItem;
