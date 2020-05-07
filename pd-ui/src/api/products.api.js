import {dataService} from "../root";


export const ENTITY_BASE = "/products";

export const fetchProducts = () => dispatch => {
    return new Promise((resolve, reject) => {
        dataService.get(ENTITY_BASE).then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    });
};

export const fetchProduct = (key) => dispatch => {
    return new Promise((resolve, reject) => {
        dataService.get(ENTITY_BASE + "/" + key).then((response) => {
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