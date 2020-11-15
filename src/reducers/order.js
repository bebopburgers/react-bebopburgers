import {CREATE_ORDER_PENDING, CREATE_ORDER_REJECT, CREATE_ORDER_RESOLVE, RESET_ORDER} from "../actions/order";

const initialState = {
    isLoading: false,
    isPaid: false,
    createdOrder: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_ORDER_PENDING:
            return {...state, isLoading: true, isPaid: false};
        case CREATE_ORDER_RESOLVE:
            return {...state, isLoading: false, isPaid: true, createdOrder: {...action.payload}};
        case CREATE_ORDER_REJECT:
            return {...state, isLoading: false, isPaid: false, createdOrder: {}};
        case RESET_ORDER:
            return {...state, isLoading: false, isPaid: false, createdOrder: {}};
        default:
            return state;
    }
}