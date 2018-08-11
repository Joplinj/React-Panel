import React from "react";
import PropTypes from "prop-types";

const HeaderMenuItem = ({ item, clickedCallBack, activeItem }) => {
  const activeClass = () => {
    if (activeItem === item.title) {
      return "menu_item_active";
    }
    return "menu_item";
  };
  return (
    <li onClick={clickedCallBack} className={activeClass()}>
      <span className={`glyphicon glyphicon-${item.icon}`} />
      {item.title}
    </li>
  );
};

HeaderMenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  clickedCallBack: PropTypes.func.isRequired,
  activeItem: PropTypes.string.isRequired
};

export default HeaderMenuItem;