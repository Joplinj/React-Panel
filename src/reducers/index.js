import { combineReducers } from 'redux';
import activePageReducer from './active_page_reducer'
import MenuItemReducer from './menu_item_reducer'

const rootReducer = combineReducers({
  activePage: activePageReducer,
  ItemMenu: MenuItemReducer
});

export default rootReducer;
