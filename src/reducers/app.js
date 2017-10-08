import {combineReducers} from 'redux';
import {find, isEmpty} from 'lodash';

import * as types from '../actions/actionTypes';

const initialState = {
    isFetching: 0,
    eventTypeId: 12
};

const isFetching = (state = initialState.isFetching, action) => {
    switch (action.type) {
        case types.SHOW_LOADER:
            return state + 1;
        case types.HIDE_LOADER:
            return state > 0 ? state - 1 : 0;
        default:
            return state;
    }
};

const eventTypeId = (state = initialState.eventTypeId, action) => {
    switch (action.type) {
        case types.CATS_LOAD_SUCCESS: {
            let isFound = find(action.result, ['slug', 'events']);
            return !isEmpty(isFound) ? isFound.id : state;
        }
        default:
            return state;
    }
};

// Combine all sub-reducers into one root reducer
const app = combineReducers({
    isFetching,
    eventTypeId
});

export default app;
