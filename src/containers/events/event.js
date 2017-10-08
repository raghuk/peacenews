import React, {Component} from 'react';
import {View, Text} from 'react-native';

import styles from './styles';


class Event extends Component {
    render() {
        return (
            <View style={styles.view}>
                <Text>Hi there... we are in event details page.</Text>
            </View>
        );
    }
}

export default Event;
