import {loginError, userLoggedIn, userLogout} from '../action/login.action';
export const logout = () => {
    history.push("/");
    localStorage.removeItem("user");
    store.dispatch(userLogout)
    window.location.href = "";
};