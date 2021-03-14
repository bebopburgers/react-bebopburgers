import {call, put, select} from 'redux-saga/effects';
import getDeliveryPriceFromApi from "../../api/delivery";
import {getDeliveryPrice, resolveDeliveryPrice, rejectDeliveryPrice} from "../../actions/address";

export const workerDeliveryData = function* (action) {
    try {
        const result = yield call(getDeliveryPriceFromApi, action.payload)

        if (result.status === 200) {
            yield put(resolveDeliveryPrice(result.data));
        }
    } catch (err) {
        yield put(rejectDeliveryPrice());
    }
}
