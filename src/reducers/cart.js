import {
    ADD_PRODUCT_TO_CART,
    ADD_PROMO_CODE,
    DECREMENT_PRODUCT_COUNT,
    INCREMENT_PRODUCT_COUNT,
    PUT_PRODUCT_TO_CART,
    REMOVE_PRODUCT_FROM_CART,
    RESET_CART
} from "../actions/dashboard";

const initialState = {
    products: [],
    promo: "",
    promoIsAdded: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_PRODUCT_TO_CART:
            return state;
        case PUT_PRODUCT_TO_CART:
            return {...state, products: [...state.products, action.payload]};
        case INCREMENT_PRODUCT_COUNT:
            return {...state, products: state.products.map(pr => pr.uuid === action.payload.uuid ?
                    { ...pr, count: pr.count + 1, price: pr.price + action.payload.price / pr.count }
                    : pr)
            }
        case DECREMENT_PRODUCT_COUNT:
            return {...state, products: state.products.map(pr => pr.uuid === action.payload.uuid ?
                    { ...pr, count: pr.count - 1, price: pr.price - action.payload.price / pr.count }
                    : pr)
            }
        case REMOVE_PRODUCT_FROM_CART:
            return {...state, products: [...state.products.filter(pr => pr.uuid !== action.payload.uuid)]};
        case ADD_PROMO_CODE:
            return {...state, promo: action.payload, promoIsAdded: true}
        case RESET_CART:
            return {...state, products: []}
        default:
            return state;
    }
}