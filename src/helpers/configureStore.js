import {createStore, applyMiddleware, compose} from 'redux';
import {AsyncStorage} from 'react-native';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'remote-redux-devtools';
import {persistStore} from 'redux-persist';

import promise from './promise';
import resetStore from './resetStore';

import {APP_RESET} from '../actions/actionTypes';

const __DEV__ = (process.env.NODE_ENV !== 'production');


export default function configureStore(sdk, client, onCompletion:()=>void) {
    let finalCreateStore;
    const promiseMiddleware = promise(sdk, client);

    if (__DEV__) {
        finalCreateStore = composeWithDevTools(
            applyMiddleware(thunk, promiseMiddleware),
            resetStore(APP_RESET)
        )(createStore);
    } else {
        finalCreateStore = compose(
            applyMiddleware(thunk, promiseMiddleware),
            resetStore(APP_RESET)
        )(createStore);
    }

    const reducers = require('../reducers').default;
    const store = finalCreateStore(reducers);

    persistStore(store, {storage: AsyncStorage}, onCompletion);

    return store;
}
