import {Dimensions, StyleSheet} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;


export const styles = {
    container: {
        backgroundColor: '#f7f7f7'
    },
    content: {
        backgroundColor: '#fff'
    },
    view: {
        flex: 1
    },
    list: {
        marginTop: 5
    },
    listItem: {
        paddingTop: 5,
        paddingBottom: 10,
        paddingRight: 10,
        marginLeft: 12,
        borderColor: '#fff',
        backgroundColor: '#f7f7f7'
    },
    card: {
        backgroundColor: '#aaa',
        shadowOpacity: 0.5,
        elevation: 4
    },
    item: {
        paddingLeft: 5,
        paddingRight: 5
    },
    title: {
        width: deviceWidth / 1.5,
        marginLeft: 0
    },
    postPic: {
        alignSelf: 'stretch',
        height: deviceHeight / 4.5,
        width: deviceWidth / 1.08,
        position: 'relative'
    }
};

export const htmlStyles = StyleSheet.create({
    body: {
        color: '#333',
        fontSize: 14,
        lineHeight: 24,
        backgroundColor: '#f7f7f7'
    },
    p: {
        color: '#333',
        marginTop: 0,
        paddingVertical: 0
    },
    ul: {
        marginTop: 0
    },
    li: {
        color: '#333'
    },
    a: {
        fontWeight: '200',
        color: '#337ab7'
    }
});
