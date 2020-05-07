import {dataService} from "../root";


export const ENTITY_BASE = "/profile";

export const fetchProfile = () => dispatch => {
    return new Promise((resolve, reject) => {
        dataService.get(ENTITY_BASE).then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    });
};

export const saveProfile = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        dataService.postJson(ENTITY_BASE, data).then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    });
};


export const updateProduct = (product) => dispatch => {
    return new Promise((resolve, reject) => {
        dataService.postJson(ENTITY_BASE, product).then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    });
}