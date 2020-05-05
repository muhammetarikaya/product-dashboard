import {dataService} from "../root";
import * as actions from "../action/login.action";
import {loginError, userLoggedIn} from "../action/login.action";

export const login = (data) => dispatch => {
    dispatch(actions.userLoginRequest());
    return new Promise((resolve, reject) => {
        dataService.post('/login', {
            email: data.email,
            password: data.password
        }).then((response) => {
            dispatch(userLoggedIn(response));
            console.log(response.headers["authorization"])
            sessionStorage.setItem('token', response.headers["authorization"]);
            resolve(response);
        }).catch((error) => {
            dispatch(loginError(error));
            reject(error);
        });
    });
}