import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Image, RefreshControl, TouchableNativeFeedback} from 'react-native';
import {connect} from 'react-redux';
import {Container, View, List, ListItem, Card, CardItem, Body, Text, Left, Right} from 'native-base';

import {isEmpty} from 'lodash';
import he from 'he';

import OverlayLoader from '../../components/loaders/OverlayLoader';

import {loadCategories} from '../../actions/types';
import {loadPosts, setCurrentPost} from '../../actions/posts';
import {getPosts, getIsFetching} from '../../resources/selectors';

import {styles} from './styles';

class Posts extends Component {
    static propTypes = {
        posts: PropTypes.arrayOf(PropTypes.object),
        isFetching: PropTypes.bool,
        loadPosts: PropTypes.func,
        loadCategories: PropTypes.func,
        setCurrentPost: PropTypes.func
    }

    static defaultProps = {
        posts: [],
        isFetching: false,
        loadPosts: () => {},
        loadCategories: () => {},
        setCurrentPost: () => {}
    }

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            refreshing: false
        };
    }

    componentWillMount() {
        if (isEmpty(this.props.posts)) {
            this.props.loadPosts();
            this.props.loadCategories();
        } else {
            console.log('posts already loaded, loading from props');
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
        this.props.loadPosts();
    }

    onPostSelect(post) {
        this.props.setCurrentPost(post.id);
        this.props.navigation.navigate('Post', {id: post.id, title: post.title});
    }

    renderItem(item) {
        return (
            <TouchableNativeFeedback onPress={() => this.onPostSelect(item)}>
                <ListItem key={item.id} style={styles.listItem}>
                    <Card>
                        <CardItem header>
                            <Left><Text style={styles.title}>{he.decode(item.title)}</Text></Left>
                            <Right><Text style={{color: '#808080'}}>{item.age}</Text></Right>
                        </CardItem>

                        <CardItem cardBody>
                            <Image source={{uri: item.image}} style={styles.postPic} />
                        </CardItem>

                        <CardItem footer>
                            <Body>
                                <Text style={{lineHeight: 20}}>{item.excerpt}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                </ListItem>
            </TouchableNativeFeedback>
        );
    }

    render() {
        const items = this.props.posts;

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
        loadPosts: () => dispatch(loadPosts()),
        loadCategories: () => dispatch(loadCategories()),
        setCurrentPost: id => dispatch(setCurrentPost(id))
    };
}

const mapStateToProps = state => ({
    posts: getPosts(state),
    isFetching: getIsFetching(state)
});

export default connect(mapStateToProps, bindAction)(Posts);
