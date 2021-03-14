import { combineReducers } from 'redux';
import organizationsReducer from './organizations';
import nomenclatureReducer from "./nomenclature";
import cartReducer from "./cart";
import orderReducer from "./order";
import deliveryReducer from  "./delivery";

const rootReducer = combineReducers({
    organizations: organizationsReducer,
    nomenclature: nomenclatureReducer,
    cart: cartReducer,
    order: orderReducer,
    delivery: deliveryReducer
});

export default rootReducer;