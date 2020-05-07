import axios from 'axios';
import React from 'react';
import {dataLoaded, dataLoading} from "./action/data.action";
import message from "antd/es/message/index";
import history from './history';
import {hideLoading, showLoading} from 'react-redux-loading-bar';
import {Icon, notification} from 'antd';
import {logout} from "./service/login.service";
import {API_URL} from "./constants";

const openNotification = (response) => {
    notification.open({
        message: 'Sistem Hatası',
        description: "Lütfen Sistem Yöneticisi ile İrtibata Geçin. Hata Mesajı -> " + response.message,
        icon: <Icon type="frown-o" style={{color: 'red'}}/>,
    });
};

class ApiService {

    constructor(store) {
        this.instance = axios.create({
            baseURL: API_URL,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            validateStatus: function (status) {
                return status >= 200 && status < 500;
            }
        });

        this.instance.interceptors.request.use((config) => {
            store.dispatch(dataLoading());
            store.dispatch(showLoading());

            const token = sessionStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = token;
            }

            return config;
        }, (error) => {
            store.dispatch(dataLoaded());
            store.dispatch(hideLoading());

            return Promise.reject(error);
        });

        this.instance.interceptors.response.use((response) => {
            store.dispatch(dataLoaded());
            store.dispatch(hideLoading());

            //UNAUTHORIZED(401, "Unauthorized"),
            if (response.status === 401) {
                logout(store);
                return;
            }

            //	FORBIDDEN(403, "Forbidden"),
            if (response.status === 403) {
                message.error("Bu Sayfaya Erisim Yetkiniz Bulunmamaktadir")
                history.push("/login")
            }

            if (response.headers['content-type'] === 'application/octet-stream') {
                return Promise.resolve(response.data);
            }
            if (response.status === 200 && response.data.status !== 'error') {
                return Promise.resolve(response)
            } else {
                // store.dispatch(logoutUser(response.data.data.message));
            }
            if (response.status !== 200) {
                //message.error(`Please contact the system administrator ${response.message}`);
                return Promise.reject(response.status);

            } else {
                //openNotification(response.data);
                return Promise.reject(response);
            }
        }, (error) => {
            store.dispatch(dataLoaded());
            store.dispatch(hideLoading());

            if (!error.message) {
                error.message = "Internal Server Error";
            }
            return Promise.reject(error.message);
        });

    }

    get(url) {
        return this.instance.get(url);
    }



    post(url, data, config) {
        return this.instance.post(url, data, config);
    }

    postJson(url, data) {
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            }
        };
        return this.instance.post(url, data, axiosConfig);
    }

    put(url, data) {
        return this.instance.put(url, data);
    }

    delete(url) {
        return this.instance.delete(url);
    }
}

export default ApiService;