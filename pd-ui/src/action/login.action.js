import * as constants from '../constants/login.constants'
import {PURGE, REHYDRATE} from 'redux-persist';

export function userLoginRequest() {
    return {
        type: constants.USER_LOGGING_IN
    }
}

export function userLogout() {
    return {
        type: constants.USER_LOGOUT
    }
}

export function userLoggedIn(data) {
    return {
        type: constants.USER_LOGGED_IN,
        payload: data
    }
}

export function loginError(errorMessage) {
    return {
        type: constants.USER_LOGIN_ERROR,
        payload: errorMessage
    }
}


export function deletePersistor() {
    return {
        type: PURGE,
        key: 'root',
        result: () => null
    }
}


export function refreshPersistor() {
    return {
        type: REHYDRATE,
    }
}