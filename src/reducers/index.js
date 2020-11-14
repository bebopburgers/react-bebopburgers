import { combineReducers } from 'redux';
import organizationsReducer from '../reducers/organizations';
import nomenclatureReducer from "../reducers/nomenclature";
import cartReducer from "../reducers/cart";
import orderReducer from "../reducers/order";

const rootReducer = combineReducers({
    organizations: organizationsReducer,
    nomenclature: nomenclatureReducer,
    cart: cartReducer,
    order: orderReducer
});

export default rootReducer;