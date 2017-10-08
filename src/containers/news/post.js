import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Image} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, View, CardItem, Body, Left, Right, Text, Button, Icon} from 'native-base';

import HTMLView from 'react-native-htmlview';
import {isEmpty} from 'lodash';

import {getSelectedPost} from '../../resources/selectors';

import {styles, htmlStyles} from './styles';


class Post extends Component {
    static propTypes = {
        post: PropTypes.object
    }

    static defaultProps = {
        post: {}
    }

    renderPost(item) {
        if (isEmpty(item)) {
            return <Text>Something went wrong, please go back to main list.</Text>;
        } else {
            return (
                <View style={styles.view}>
                    <CardItem header style={styles.item}>
                        <Text>{item.title}</Text>
                    </CardItem>

                    <CardItem cardBody style={styles.item}>
                        <Body>
                            <Image source={{uri: item.image}} style={styles.postPic} />
                        </Body>
                    </CardItem>

                    <CardItem content style={styles.item}>
                        <HTMLView value={item.description} stylesheet={htmlStyles}/>
                    </CardItem>

                    <CardItem footer style={{marginBottom: 10}}>
                        <Left>
                            <Button iconLeft transparent dark small>
                                <Icon name="ios-person"/>
                                <Text uppercase={false}>{item.author.name}</Text>
                            </Button>
                        </Left>

                        <Right>
                            <Button iconLeft transparent info small>
                                <Icon name="md-alarm"/>
                                <Text uppercase={false}>{item.age}</Text>
                            </Button>
                        </Right>
                    </CardItem>
                </View>
            );
        }
    }

    render() {
        return (
            <Container>
                <Content padder style={styles.content}>
                    {this.renderPost(this.props.post)}
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    post: getSelectedPost(state)
});

export default connect(mapStateToProps, null)(Post);
