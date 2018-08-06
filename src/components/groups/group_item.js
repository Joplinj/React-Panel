import React from "react";
import Timestamp from "react-timestamp";

const GroupItem = ({
  plannedDate,
  country,
  city,
  key,
  allowedMembers,
  callback
}) => {
  return (
    <tr key={key} onClick={callback}>
      <td>
        <Timestamp time={plannedDate} format="full" />
      </td>
      <td>{country}</td>
      <td>{city}</td>
      <td>{allowedMembers}</td>
    </tr>
  );
};

export default GroupItem;
