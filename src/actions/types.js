import * as types from './actionTypes';


export function loadCategories() {
    return {
        type: [types.CATS_LOAD, types.CATS_LOAD_SUCCESS, types.CATS_LOAD_FAILURE],
        promise: (sdk) => sdk.getCategories(),
        loader: true
    };
}
