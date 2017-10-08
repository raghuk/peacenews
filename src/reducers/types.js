import {combineReducers} from 'redux';
import {concat, includes} from 'lodash';

import * as types from '../actions/actionTypes';
import {transformCategory} from '../resources/transforms';

const initialState = {
    byId: {},
    allIds: [],
    error: null
};

const getFlattenedActionResult = (actionResult) => {
    return Object.keys(actionResult).reduce((result, key) => {
        return result.concat(actionResult[key]);
    }, []);
};

const byId = (state = initialState.byId, action) => {
    switch (action.type) {
        case types.CATS_LOAD_SUCCESS:
            return getFlattenedActionResult(action.result).reduce((result, item) => {
                return {
                    ...result,
                    [item.id]: transformCategory(item)
                }
            }, state);
        default:
            return state;
    }
};

const allIds = (state = initialState.allIds, action) => {
    switch (action.type) {
        case types.CATS_LOAD_SUCCESS:
            return getFlattenedActionResult(action.result).reduce((result, item) => {
                return !includes(result, item.id) ? concat(result, item.id) : result;
            }, state);
        default:
            return state;
    }
};

const error = (state = initialState.error, action) => {
    switch (action.type) {
        case types.CATS_LOAD_FAILURE:
            return action.error;
        case types.CATS_LOAD_SUCCESS:
            return null;
        default:
            return state;
    }
};

// Combine all sub-reducers into one root reducer
const categories = combineReducers({
    byId,
    allIds,
    error
});

export default categories;
