import {
    ADD_DELIVERY_WITH_SNAPSHOT,
    GET_DELIVERY_PRICE_PENDING,
    GET_DELIVERY_PRICE_REJECT,
    GET_DELIVERY_PRICE_RESOLVE, RESET_DELIVERY, RESET_DELIVERY_WITH_SNAPSHOT, SET_DELIVERY_ADDRESS
} from "../actions/address";

const initialState = {
    isLoading: false,
    delivery: undefined,
    address: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DELIVERY_PRICE_PENDING:
            return {...state, isLoading: true};
        case GET_DELIVERY_PRICE_RESOLVE:
            return {...state, isLoading: false, delivery: action.payload};
        case SET_DELIVERY_ADDRESS:
            return  { ...state, isLoading: false, address: action.payload}
        case ADD_DELIVERY_WITH_SNAPSHOT:
            return {...state, isLoading: false, delivery: action.payload};
        case RESET_DELIVERY:
            return {...state, delivery: undefined, isLoading: false};
        case GET_DELIVERY_PRICE_REJECT:
            return {...state, isLoading: false, delivery: undefined};
        case RESET_DELIVERY_WITH_SNAPSHOT:
            return {...state, isLoading: false, delivery: undefined};
        default:
            return state;
    }
}