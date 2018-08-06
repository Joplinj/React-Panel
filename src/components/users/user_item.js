import React from "react";
import Timestamp from "react-timestamp";

const UserItem = ({ email, country, city, key, subscribe, callback }) => {
  return (
    <tr key={key} onClick={callback}>
      <td>{email}</td>
      <td>{country}</td>
      <td>{city}</td>
      <td>
        <Timestamp time={subscribe} format="ago" />
      </td>
    </tr>
  );
};

export default UserItem;
