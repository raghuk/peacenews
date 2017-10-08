import React from 'react';
import {StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import About from './containers/about';
import {Events, Event} from './containers/events';
import {Posts, Post} from './containers/news';

const NewsTab = StackNavigator({
    Posts: {
        screen: Posts,
        path: '/',
        navigationOptions: () => ({
            title: 'Peace News',
            headerStyle: {
                backgroundColor: '#1b6888', borderWidth: 1, borderBottomColor: '#fff'
            },
            headerTitleStyle: {
                color: '#fdfdfd', fontSize: 18
            }
        })
    },
    Post: {
        screen: Post,
        path: '/post/:id',
        navigationOptions: ({ navigation }) => ({
            title: 'News Detail',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#1b6888', borderWidth: 1, borderBottomColor: '#fff'
            },
            headerTitleStyle: {
                color: '#fdfdfd', fontSize: 18
            },
            headerBackTitleStyle: {
                color: '#fdfdfd'
            }
        })
    }
});

const EventsTab = StackNavigator({
    Events: {
        screen: Events,
        path: '/',
        navigationOptions: () => ({
            title: 'Events',
            headerStyle: {
                backgroundColor: '#1b6888', borderWidth: 1, borderBottomColor: '#fff'
            },
            headerTitleStyle: {
                color: '#fdfdfd', fontSize: 18
            }
        })
    },
    Event: {
        screen: Event,
        path: '/event/:id',
        navigationOptions: ({ navigation }) => ({
            title: 'Event Details',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#1b6888', borderWidth: 1, borderBottomColor: '#fff'
            },
            headerTitleStyle: {
                color: '#fdfdfd', fontSize: 18
            },
            headerBackTitleStyle: {
                color: '#fdfdfd'
            }
        })
    }
});

const InfoTab = StackNavigator({
    Info: {
        screen: About,
        path: '/',
        navigationOptions: () => ({
            title: 'About Us',
            headerStyle: {
                backgroundColor: '#1b6888', borderWidth: 1, borderBottomColor: '#fff'
            },
            headerTitleStyle: {
                color: '#fdfdfd', fontSize: 18
            }
        })
    }
});

const MainTabNavigator = TabNavigator(
    {
        NewsTab: {
            screen: NewsTab,
            path: '/',
            navigationOptions: {
                tabBarLabel: 'News',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon
                        name={focused ? 'ios-paper' : 'ios-paper-outline'}
                        size={26}
                        style={{ marginBottom: -3 }}
                        color={focused ? '#2f95dc' : '#222222'} />
                )
            }
        },
        EventsTab: {
            screen: EventsTab,
            path: '/events',
            navigationOptions: {
                tabBarLabel: 'Events',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon
                        name={focused ? 'ios-megaphone' : 'ios-megaphone-outline'}
                        size={26}
                        style={{ marginBottom: -3 }}
                        color={focused ? '#2f95dc' : '#222222'} />
                )
            }
        },
        InfoTab: {
            screen: InfoTab,
            path: '/info',
            navigationOptions: {
                tabBarLabel: 'About',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon
                        name={focused ? 'ios-information-circle' : 'ios-information-circle-outline'}
                        size={26}
                        style={{ marginBottom: -3 }}
                        color={focused ? '#2f95dc' : '#222222'} />
                )
            }
        }
    },
    {
        initialRouteName: 'NewsTab',
        backBehavior: 'none',
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false
    }
);

export default MainTabNavigator;
