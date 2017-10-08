import * as types from './actionTypes';


export function loadPosts(page = 1, exclude = 12) {
    return {
        type: [types.POSTS_LOAD, types.POSTS_LOAD_SUCCESS, types.POSTS_LOAD_FAILURE],
        promise: (sdk) => sdk.getPosts(page, exclude),
        loader: true
    };
}

export function setCurrentPost(id) {
    return {
        type: types.SET_CURRENT_POST,
        id
    };
}
