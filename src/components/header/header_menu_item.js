import React from 'react';

const HeaderMenuItem = ({item, clickedCallBack, activeItem}) => {
    const activeClass = () => {
        if (activeItem === item.title) {
            return "menu_item_active"
        }
        return "menu_item"
    }
    return (
        <li onClick={clickedCallBack} className={activeClass()}>
            <span className={`glyphicon glyphicon-${item.icon}`}></span>
            {item.title}
        </li>
    )
}

export default HeaderMenuItem;