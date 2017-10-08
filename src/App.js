import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import CodePush from 'react-native-code-push';
import OneSignal from 'react-native-onesignal';

import Modal from 'react-native-modalbox';
import SplashScreen from 'react-native-splash-screen';
import {Container, Content, Text, View} from 'native-base';

import Navigator from './Navigator';
import ProgressBar from './components/loaders/ProgressBar';

const styles = StyleSheet.create({
    content: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal1: {
        height: 300
    }
});


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showDownloadingModal: false,
            showInstalling: false,
            downloadProgress: 0
        };
    }

    componentWillMount() {
        OneSignal.addEventListener('received', this.onReceived());
        OneSignal.addEventListener('opened', this.onOpened());
        OneSignal.addEventListener('registered', this.onRegistered());
        OneSignal.addEventListener('ids', this.onIds());
    }

    componentDidMount() {
        SplashScreen.hide();

        OneSignal.enableSound(true);
        OneSignal.inFocusDisplaying(2);

        if (CodePush) {
            CodePush.sync({
                updateDialog: true,
                installMode: CodePush.InstallMode.IMMEDIATE
            }, (status) => {
                switch (status) {
                    case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                        this.setState({showDownloadingModal: true});
                        this._modal.open();
                        break;
                    case CodePush.SyncStatus.INSTALLING_UPDATE:
                        this.setState({showInstalling: true});
                        break;
                    case CodePush.SyncStatus.UPDATE_INSTALLED:
                        this._modal.close();
                        this.setState({showDownloadingModal: false});
                        break;
                    default:
                        break;
                }
            }, ({receivedBytes, totalBytes}) => {
                this.setState({
                    downloadProgress: (receivedBytes / totalBytes) * 100
                });
            });
        }
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived());
        OneSignal.removeEventListener('opened', this.onOpened());
        OneSignal.removeEventListener('registered', this.onRegistered());
        OneSignal.removeEventListener('ids', this.onIds());
    }

    onReceived(notification) {
        console.log('Notification onReceived: ', notification);
    }

    onOpened(openResult) {
        console.log('Notification onOpened: ', openResult);
    }

    onRegistered(notifData) {
        console.log('Device Registered: ', notifData);
    }

    onIds(device) {
        console.log('Device info: ', device);
    }

    render() {
        if (this.state.showDownloadingModal) {
            return (
                <Container>
                    <Content style={styles.content}>
                        <Modal
                            style={[styles.modal, styles.modal1]}
                            backdrop={false}
                            ref={(c) => {this._modal = c;}}
                            swipeToClose={false}>
                            <View
                                style={{
                                    flex: 1,
                                    alignSelf: 'stretch',
                                    justifyContent: 'center',
                                    padding: 20
                                }}>
                                {this.state.showInstalling
                                    ? <Text
                                        style={{
                                            textAlign: 'center',
                                            marginBottom: 15,
                                            fontSize: 15
                                        }}>
                                        Installing update...
                                    </Text>
                                    : <View
                                        style={{
                                            flex: 1,
                                            alignSelf: 'stretch',
                                            justifyContent: 'center',
                                            padding: 20
                                        }}>
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                marginBottom: 15,
                                                fontSize: 15
                                            }}>
                                            Downloading update... {`${parseInt(this.state.downloadProgress)} %`}
                                        </Text>
                                        <ProgressBar
                                            progress={parseInt(this.state.downloadProgress)} />
                                    </View>
                                }
                            </View>
                        </Modal>
                    </Content>
                </Container>
            );
        }

        return <Navigator />;
    }
}

export default App;