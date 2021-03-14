import {takeEvery, all} from 'redux-saga/effects';
import {
    ADD_PRODUCT_TO_CART,
    GET_DASHBOARD_DATA_PENDING,
    PREPARE_FOR_REMOVE_FROM_CART
} from "../actions/dashboard";
import {GET_ACCESS_TOKEN} from  '../actions/root/index';
import {CREATE_ORDER_PENDING} from "../actions/order";
import {GET_DELIVERY_PRICE_PENDING} from "../actions/address";
import {
    workerDashboardData,
    workerCartSetData,
    workerCartRemoveData
} from './dashboard';
import workerAccessToken from "./root";
import {workerOrderData} from "./order";
import {workerDeliveryData} from "./delivery";

function* watchAll() {
    yield all([
        takeEvery(GET_ACCESS_TOKEN, workerAccessToken),
        takeEvery(GET_DASHBOARD_DATA_PENDING, workerDashboardData),
        takeEvery(ADD_PRODUCT_TO_CART, workerCartSetData),
        takeEvery(PREPARE_FOR_REMOVE_FROM_CART, workerCartRemoveData),
        takeEvery(CREATE_ORDER_PENDING, workerOrderData),
        takeEvery(GET_DELIVERY_PRICE_PENDING, workerDeliveryData),
        // takeEvery("CREATE_USER_REQUESTED", createUser)
    ]);
}

export default watchAll;