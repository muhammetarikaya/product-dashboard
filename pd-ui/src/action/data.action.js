import {DATA_LOADED, DATA_LOADING, PAGE_NAVIGATED} from "../constants/data.constants";

export function dataLoading() {
    return {
        type: DATA_LOADING
    }
}

export function dataLoaded() {
    return {
        type: DATA_LOADED
    }
}

export function pageNavigated(activePage) {
    return {
        type: PAGE_NAVIGATED,
        payload: activePage
    }
}