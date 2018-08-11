import React from "react";
import Timestamp from "react-timestamp";
import PropTypes from "prop-types";

const GroupItem = ({
  plannedDate,
  country,
  city,
  allowedMembers,
  callback
}) => {
  return (
    <tr onClick={callback}>
      <td>
        <Timestamp time={plannedDate} format="full" />
      </td>
      <td>{country}</td>
      <td>{city}</td>
      <td>{allowedMembers}</td>
    </tr>
  );
};

GroupItem.propTypes = {
  plannedDate: PropTypes.object.isRequired,
  country: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  allowedMembers: PropTypes.number.isRequired,
  callback: PropTypes.func.isRequired
}

export default GroupItem;
