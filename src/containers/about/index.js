import React, {Component} from 'react';
import {Linking} from 'react-native';

import {Container, Content, View, H3, Text} from 'native-base';

import styles from './styles';


class About extends Component {
    handleLinkPress(link) {
        Linking.openURL(link);
    }

    render() {
        return (
            <Container>
                <Content padder style={styles.content}>
                    <View style={styles.view}>
                        <H3>Brahma Kumaris</H3>
                        <Text style={styles.note} onPress={() => this.handleLinkPress('http://brahmakumaris.org')}>
                            http://brahmakumaris.org
                        </Text>
                        <Text style={styles.info}>
                            Prajapita Brahma Kumaris Ishwariya Vishwa Vidyalaya, (Brahma Kumaris in short) is a unique, spiritual, value-based educational institution.
                            The Vidyalaya and two institutions created by it, namely Rajyoga Education and Research Foundation, and Brahma Kumaris Academy for a Better World, are dedicated to the goal of establishing a value-based society.
                            We focus on development of human potential, bringing harmony into human relationships and changing the attitudes and outlook of people to promote the spirit of brotherhood, love and co-operation.
                        </Text>
                        <H3>Godlywood Studio</H3>
                        <Text style={styles.note} onPress={() => this.handleLinkPress('http://www.godlywoodstudio.org')}>
                            http://www.godlywoodstudio.org
                        </Text>
                        <Text style={styles.info}>
                            We facilitates television programs to revolutionize the impact the impact of the media on the individual and collective consciousness. We produces Talk shows and different spiritual programs in English, Hindi, and other regional languages including Gujarati, Malayalam, Telugu, Punjabi, Kannada, Tamil and Bengali etc.
                            We provides additional performances in larger quantities which allow viewers to enjoy spiritual uplifting programs. We assists 20 departments like writing, scripting, production, direction, animation and editing in both national and regional programs.
                            Those spiritual programs leaves an indelible imprint on the mind of the viewers. Motivational and inspirational programs help viewers prioritize the positive values in their lives.
                        </Text>
                        <H3>App Info</H3>
                        <Text style={styles.info}>
                            This app brings you latest news and events done by Brahma Kumaris from across the world. Visit our website for more info
                            <Text style={styles.note} onPress={() => this.handleLinkPress('http://www.gwspeacenews.org')}> www.gwspeacenews.org</Text>
                        </Text>
                        <Text style={styles.info}>
                            For any queries and improvments of the app, please write to us <Text style={styles.note}>godlywood.it@gmail.com</Text>
                        </Text>
                    </View>
                </Content>
            </Container>
        );
    }
}

export default About;
