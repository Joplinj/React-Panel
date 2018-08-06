import React, {Component} from 'react';
import HeaderMenuItem from '../components/header/header_menu_item';
import { connect } from 'react-redux';
import { ActivePage } from '../actions/index';
import { bindActionCreators } from 'redux';

class HeaderMenuList extends Component {
    render() {
        return (
            <ul>
                {this.props.ItemMenu.map((item) => {
                    return <HeaderMenuItem 
                                key={item.title} 
                                item={item}
                                clickedCallBack={this.props.activePage != item.title ? () => this.props.ActivePage(item) : () => "" }
                                activeItem={this.props.activePage}
                            />
                })}
            </ul>
            
        )
    }
}


function mapStateToProps(state) {
    return {
        ItemMenu: state.ItemMenu,
        activePage: state.activePage
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ActivePage:ActivePage}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenuList);