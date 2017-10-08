import {combineReducers} from 'redux';
import {concat, includes} from 'lodash';

import * as types from '../actions/actionTypes';
import {transformEvent} from '../resources/transforms';

const initialState = {
    byId: {},
    allIds: [],
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
        case types.EVENTS_LOAD_SUCCESS:
            return getFlattenedActionResult(action.result).reduce((result, item) => {
                return {
                    ...result,
                    [item.id]: transformEvent(item)
                }
            }, state);
        default:
            return state;
    }
};

const allIds = (state = initialState.allIds, action) => {
    switch (action.type) {
        case types.EVENTS_LOAD_SUCCESS:
            return getFlattenedActionResult(action.result).reduce((result, item) => {
                return !includes(result, item.id) ? concat(result, item.id) : result;
            }, state);
        default:
            return state;
    }
};

const selectedId = (state = initialState.selectedId, action) => {
    switch (action.type) {
        case types.SET_CURRENT_EVENT:
            return action.id;
        default:
            return state;
    }
};

const error = (state = initialState.error, action) => {
    switch (action.type) {
        case types.EVENTS_LOAD_FAILURE:
            return action.error;
        case types.EVENTS_LOAD_SUCCESS:
            return null;
        default:
            return state;
    }
};

// Combine all sub-reducers into one root reducer
const events = combineReducers({
    byId,
    allIds,
    selectedId,
    error
});

export default events;
