import {
    Button,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    Animated,
} from "react-native";
import React, {useEffect, useState} from "react";
import {AntDesign} from '@expo/vector-icons';
import {connect} from "react-redux";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {deleteHistory} from "../redux/actions/historyActions";


const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 20,
        alignItems: 'center',
    },
    item: {
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    name: {fontSize: 17},
    phoneNumber: {
        opacity: 0.6,
        fontSize: 14,
        paddingVertical: 5,
    },
    deleteBox: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 70
    }

});

const ListEmptyComponent = () => {

    return (
        <View style={{paddingVertical: 100, paddingHorizontal: 100}}>
            <Text info message="No history to show"/>
        </View>
    );
};


const Todo = (props) => {

    const leftSide = (progress, dragX, historyId) => {

        const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        })

        const handleDelete = () => {
            props.deleteHistory(props.todo._id)
        }

        return (
            <TouchableOpacity activeOpacity={0.6} onPress={handleDelete}>
                <View style={styles.deleteBox}>
                    <Animated.Text style={[{color: '#fff'},

                        {transform: [{scale: scale}]}]}>Delete</Animated.Text>
                </View>
            </TouchableOpacity>
        )
    }


    return (
        <Swipeable renderLeftActions={leftSide}
        >
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                    props.navigation.push('HistoryPost', {
                        postId: props.todo.post._id
                    })
                }}
            >
                <View style={styles.item}>
                    <Image
                        style={{width: 50, height: 50, borderRadius: 100}}
                        source={{uri: "https://icons.iconarchive.com/icons/papirus-team/papirus-mimetypes/512/x-office-document-icon.png"}}
                    />

                    <View style={{paddingLeft: 20}}>
                        <View style={{flexDirection: 'row', paddingTop: 5}}>
                            <Text style={styles.name}>{"№ " + props.todo.post.body}</Text>
                        </View>
                        <Text
                            style={
                                styles.phoneNumber
                            }>{props.todo.createdAt.split('T')[0] + ' '
                        + (props.todo.createdAt).substring(11, 19)}</Text>
                    </View>
                </View>
                <AntDesign name="rightcircle" size={24} color="#3F51B5"/>
            </TouchableOpacity>
        </Swipeable>
    )
}


const DetailsScreen = (props) => {

    const [postsState, setPostStates] = useState([])

    useEffect(() => {
        setPostStates(props.history.histories)
    }, [props.history.histories])

    return (
        <FlatList
            data={postsState}
            renderItem={({item}) => <Todo deleteHistory={props.deleteHistory}
                                          todo={item} navigation={props.navigation}/>}
            keyExtractor={item => (item._id + Date.now()).toString()}
            ListEmptyComponent={ListEmptyComponent}
            ItemSeparatorComponent={() => (
                <View
                    style={{height: 0.5, backgroundColor: "grey"}}></View>
            )}
            ListFooterComponent={<View style={{height: 50}}></View>}
        />
    )
}


const mapStateToProps = (state) => ({
    history: state.history
})

export default connect(mapStateToProps, {deleteHistory})(DetailsScreen)