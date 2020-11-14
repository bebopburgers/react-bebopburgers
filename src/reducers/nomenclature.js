import {GET_NOMENCLATURE_PENDING, GET_NOMENCLATURE_RESOLVE, GET_NOMENCLATURE_REJECT} from "../actions/dashboard";

const initialState = {
    isLoading: false,
    nomenclature: {
        groups: [],
        revision: 0,
        uploadDate: "",
        productsList: []
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_NOMENCLATURE_PENDING:
            return {...state, isLoading: true};
        case GET_NOMENCLATURE_RESOLVE:
            return {
                ...state,
                isLoading: false,
                nomenclature: Object.assign({}, state.nomenclature, {...action.payload}),
            };
        case GET_NOMENCLATURE_REJECT:
            return {...state, isLoading: false};
        default:
            return state;
    }
}