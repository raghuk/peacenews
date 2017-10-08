import React from 'react';
import {Provider} from 'react-redux';
import {StyleProvider} from 'native-base';

import App from './App';

import configureStore from './helpers/configureStore';
import ApiClient from './helpers/apiClient';
import AppSdkFactory from './helpers/sdk';

import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

const client = new ApiClient();
const sdkFactory = new AppSdkFactory(client);
const appSdk = sdkFactory.buildSdk(2);

const store = configureStore(appSdk, client);


const setup = () => (
    <StyleProvider style={getTheme(platform)}>
        <Provider store={store}>
            <App />
        </Provider>
    </StyleProvider>
);

export default setup;
