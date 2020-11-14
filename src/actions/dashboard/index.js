export const GET_DASHBOARD_DATA_PENDING = 'GET_DASHBOARD_DATA_PENDING';
export const GET_DASHBOARD_DATA_RESOLVE = 'GET_DASHBOARD_DATA_RESOLVE';
export const GET_DASHBOARD_DATA_REJECT = 'GET_DASHBOARD_DATA_REJECT';

export const GET_NOMENCLATURE_PENDING = 'GET_NOMENCLATURE_PENDING';
export const GET_NOMENCLATURE_RESOLVE = 'GET_NOMENCLATURE_RESOLVE';
export const GET_NOMENCLATURE_REJECT = 'GET_NOMENCLATURE_REJECT';

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const PUT_PRODUCT_TO_CART = 'PUT_PRODUCT_TO_CART';
export const PREPARE_FOR_REMOVE_FROM_CART = 'PREPARE_FOR_REMOVE_FROM_CART';
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';
export const INCREMENT_PRODUCT_COUNT = 'INCREMENT_PRODUCT_COUNT';
export const DECREMENT_PRODUCT_COUNT = 'DECREMENT_PRODUCT_COUNT';
export const RESET_CART = 'RESET_CART';
export const ADD_PROMO_CODE = 'ADD_PROMO_CODE';

export const getOrganizations = () => {
    return {
        type: GET_DASHBOARD_DATA_PENDING,
        payload: null
    }
}

export const putOrganizations = (payload) => {
    return {
        type: GET_DASHBOARD_DATA_RESOLVE,
        payload: payload
    }
}

export const rejectOrganizations = () => {
    return {
        type: GET_DASHBOARD_DATA_REJECT,
        payload: undefined
    }
}

export const getNomenclature = (id) => {
    return {
        type: GET_NOMENCLATURE_PENDING,
        payload: id
    }
}

export const putNomenclature = (payload) => {
    return {
        type: GET_NOMENCLATURE_RESOLVE,
        payload: payload
    }
}

export const rejectNomenclature = () => {
    return {
        type: GET_NOMENCLATURE_REJECT,
        payload: undefined
    }
}

export const addToCart = (product) => {
    return {
        type: ADD_PRODUCT_TO_CART,
        payload: product
    }
}

export const putToCart = (product) => {
    return {
        type: PUT_PRODUCT_TO_CART,
        payload: product
    }
}

export const incrementProductCount = (product) => {
    return {
        type: INCREMENT_PRODUCT_COUNT,
        payload: product
    }
}

export const decrementProductCount = (product) => {
    return {
        type: DECREMENT_PRODUCT_COUNT,
        payload: product
    }
}

export const prepareToRemoveFromCart = (product) => {
    return {
        type: PREPARE_FOR_REMOVE_FROM_CART,
        payload: product
    }
}

export const removeFromCart = (product) => {
    return {
        type: REMOVE_PRODUCT_FROM_CART,
        payload: product
    }
}

export const addPromoCode = (code) => {
    return {
        type: ADD_PROMO_CODE,
        payload: code
    }
}

export const resetCart = () => {
    return {
        type: RESET_CART,
        payload: null
    }
}