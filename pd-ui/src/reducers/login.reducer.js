import * as constants from '../constants/login.constants'

const initialState = {
    data: {},
    isLoading: false,
    isLoggedIn: false,
    error: false
};

export default function loginReducer(state = initialState, {
    type,
    payload
}) {
    switch (type) {
        case constants.USER_LOGGING_IN:
            return {
                ...state,
                isLoading: true
            };
        case constants.USER_LOGGED_IN:
            return {
                ...state,
                data: payload,
                isLoggedIn: true
            };
        default:
            return initialState
    }
}

const store = {
    auth: {
        data: null,
        isloading: false
    }
};