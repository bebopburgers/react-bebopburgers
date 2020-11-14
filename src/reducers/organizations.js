import {GET_DASHBOARD_DATA_PENDING, GET_DASHBOARD_DATA_RESOLVE, GET_DASHBOARD_DATA_REJECT} from "../actions/dashboard";

const initialState = {
    isLoading: false,
    organizations: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DASHBOARD_DATA_PENDING:
            return {...state, isLoading: true};
        case GET_DASHBOARD_DATA_RESOLVE:
            return {...state, isLoading: false, organizations: [...action.payload]};
        case GET_DASHBOARD_DATA_REJECT:
            return {...state, isLoading: false};
        default:
            return state;
    }
}