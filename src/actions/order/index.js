export const CREATE_ORDER_PENDING = 'CREATE_ORDER_PENDING';
export const CREATE_ORDER_RESOLVE = 'CREATE_ORDER_RESOLVE';
export const CREATE_ORDER_REJECT = 'CREATE_ORDER_REJECT';

export const createOrder = (data) => {
    return {
        type: CREATE_ORDER_PENDING,
        payload: data
    }
}

export const resolveOrder = (data) => {
    return {
        type: CREATE_ORDER_RESOLVE,
        payload: data
    }
}

export const rejectOrder = (err) => {
    return {
        type: CREATE_ORDER_REJECT,
        payload: err
    }
}