import React, { Component } from 'react';
import HeaderMenuList from '../../containers/header_menu';

const Header = () => {
    return (
        <div>
        <div className="header_top_bar">

        </div>
        <div className="header_container">
                <HeaderMenuList />
        </div>
        </div>
    );
}

export default Header;
