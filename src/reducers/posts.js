import {combineReducers} from 'redux';
import {isArray, concat, includes} from 'lodash';

import * as types from '../actions/actionTypes';
import {transformPost} from '../resources/transforms';

const initialState = {
    byId: {},
    allIds: [],
    totalCount: 0,
    selectedId: 0,
    error: null
};

const getFlattenedActionResult = (actionResult) => {
    return Object.keys(actionResult).reduce((result, key) => {
        return result.concat(actionResult[key]);
    }, []);
};

const byId = (state = initialState.byId, action) => {
    switch (action.type) {
        case types.POSTS_LOAD_SUCCESS:
            return getFlattenedActionResult(action.result).reduce((result, item) => {
                return {
                    ...result,
                    [item.id]: transformPost(item)
                }
            }, state);
        default:
            return state;
    }
};

const allIds = (state = initialState.allIds, action) => {
    switch (action.type) {
        case types.POSTS_LOAD_SUCCESS:
            return getFlattenedActionResult(action.result).reduce((result, item) => {
                return !includes(result, item.id) ? concat(result, item.id) : result;
            }, state);
        default:
            return state;
    }
};

const totalCount = (state = initialState.totalCount, action) => {
    switch (action.type) {
        case types.POSTS_LOAD_SUCCESS: {
            let data = action.result;
            return (isArray(data) && data.length > 0) ? parseInt(data[0].count) : state;
        }
        default:
            return state;
    }
};

const selectedId = (state = initialState.selectedId, action) => {
    switch (action.type) {
        case types.SET_CURRENT_POST:
            return action.id;
        default:
            return state;
    }
};

const error = (state = initialState.error, action) => {
    switch (action.type) {
        case types.POSTS_LOAD_FAILURE:
            return action.error;
        case types.POSTS_LOAD_SUCCESS:
            return null;
        default:
            return state;
    }
};

// Combine all sub-reducers into one root reducer
const posts = combineReducers({
    byId,
    allIds,
    totalCount,
    selectedId,
    error
});

export default posts;
