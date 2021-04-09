export const ADD_DELIVERY_WITH_SNAPSHOT = 'ADD_DELIVERY_WITH_SNAPSHOT';
export const RESET_DELIVERY_WITH_SNAPSHOT = 'RESET_DELIVERY_WITH_SNAPSHOT';
export const RESET_DELIVERY = 'RESET_DELIVERY';

export const GET_DELIVERY_PRICE_PENDING = 'GET_DELIVERY_PRICE_PENDING';
export const GET_DELIVERY_PRICE_RESOLVE = 'GET_DELIVERY_PRICE_RESOLVE';
export const GET_DELIVERY_PRICE_REJECT = 'GET_DELIVERY_PRICE_REJECT';
export const SET_DELIVERY_ADDRESS = 'SET_DELIVERY_ADDRESS';

export const getDeliveryPrice = (data, cartSum) => {
    return {
        type: GET_DELIVERY_PRICE_PENDING,
        payload: {...data, price: cartSum }
    }
}

export const setDeliveryAddress = (address) => {
    return {
        type: SET_DELIVERY_ADDRESS,
        payload: {...address}
    }
}

export const resolveDeliveryPrice = (data) => {
    return {
        type: GET_DELIVERY_PRICE_RESOLVE,
        payload: data
    }
}

export const resetDelivery = () => {
    return {
        type: RESET_DELIVERY,
        payload: null
    }
}

export const rejectDeliveryPrice = (err) => {
    return {
        type: GET_DELIVERY_PRICE_REJECT,
        payload: err
    }
}

export const addToDeliveryForSnapshot = (delivery) => {
    return {
        type: ADD_DELIVERY_WITH_SNAPSHOT,
        payload: delivery
    }
}

export const resetDeliveryForSnapshot = () => {
    return {
        type: RESET_DELIVERY_WITH_SNAPSHOT,
        payload: {}
    }
}

