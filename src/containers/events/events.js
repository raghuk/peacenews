import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {Container, View, List, ListItem, Card, CardItem, Body, Text} from 'native-base';

import {isEmpty} from 'lodash';

import OverlayLoader from '../../components/loaders/OverlayLoader';

import {loadEvents, setCurrentEvent} from '../../actions/events';
import {getEvents, getIsFetching} from '../../resources/selectors';

import styles from './styles';


class Events extends Component {
    static propTypes = {
        events: PropTypes.arrayOf(PropTypes.object),
        isFetching: PropTypes.bool,
        loadEvents: PropTypes.func,
        setCurrentEvent: PropTypes.func
    }

    static defaultProps = {
        events: [],
        isFetching: false,
        loadEvents: () => {},
        setCurrentEvent: () => {}
    }

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            refreshing: false
        };
    }

    componentWillMount() {
        if (isEmpty(this.props.events)) {
            this.props.loadEvents();
        } else {
            console.log('events already loaded, loading from props');
        }
    }

    componentWillReceiveProps(props) {
        if (this.state.loading !== props.isFetching) {
            this.setState({loading: props.isFetching});
        }

        if (this.state.refreshing) {
            this.setState({refreshing: false});
        }
    }

    refreshList() {
        this.setState({refreshing: true});
        this.props.loadEvents();
    }

    renderItem(item) {
        return (
            <ListItem key={item.id} style={styles.listItem}>
                <Card style={styles.card}>
                    <CardItem>
                        <Body>
                            <Text style={{lineHeight: 20}}>{item.title}</Text>
                        </Body>
                    </CardItem>
                </Card>
            </ListItem>
        );
    }

    render() {
        const items = this.props.events;

        return (
            <Container style={styles.container}>
                <View style={styles.view}>
                    <OverlayLoader visible={this.state.loading} />
                    <List
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={() => this.refreshList()} />
                        }
                        dataArray={items}
                        renderRow={(item) => this.renderItem(item)}
                        style={styles.list} />
                </View>
            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        loadEvents: () => dispatch(loadEvents()),
        setCurrentEvent: id => dispatch(setCurrentEvent(id))
    };
}

const mapStateToProps = state => ({
    events: getEvents(state),
    isFetching: getIsFetching(state)
});

export default connect(mapStateToProps, bindAction)(Events);
