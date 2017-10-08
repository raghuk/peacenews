import {combineReducers} from 'redux';

import app from './app';
import events from './events';
import posts from './posts';
import categories from './types';


export default combineReducers({
    app,
    events,
    posts,
    categories
});
