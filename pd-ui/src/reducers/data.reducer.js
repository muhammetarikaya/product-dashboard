import * as constants from "../constants/data.constants";

const initialState = {
    loading: false,
    activePage: '/'
};

export default function dataReducer(state = initialState, {
    type,
    payload
}) {
    switch (type) {
        case constants.PAGE_NAVIGATED:
            return {
                ...state,
                activePage: payload,
                loading: false
            };
        case  constants.DATA_LOADING:
            return {
                ...state,
                loading: true
            };
            break;
        case constants.DATA_LOADED:
            return {
                ...state,
                loading: false
            };
            break;
        default:
            return state;
    }
};