import React, {useEffect} from "react";
import {StyleSheet, View, Text, Button} from "react-native";
import {connect} from "react-redux";
import {getPost} from "../redux/actions/postActions";

const DetailsPostScreen = (props) => {

    const patt1 = /\.[0-9a-z]+$/i;

    useEffect(() => {
        props.getPost(props.route.params.postId)
    }, [props.route.params.postId])


    return (
        <View style={styles.container}>
            {props.post &&
            <View style={styles.wrapper}>
                <Text style={styles.sectionTitle}>Full information</Text>

                <View style={styles.items}>
                    <View style={styles.item}>

                        <View style={styles.itemLeft}>
                            <View style={styles.square}></View>
                            <Text style={styles.itemText}>{"Full name: " + props.firstName + " " +
                            props.lastName
                            }</Text>
                        </View>
                        <View style={styles.circular}></View>
                    </View>

                    <View style={styles.item}>

                        <View style={styles.itemLeft}>
                            <View style={styles.square}></View>
                            <Text style={styles.itemText}>{"Conclusion number: " + props.post.body}</Text>
                        </View>
                        <View style={styles.circular}></View>
                    </View>
                    <View style={styles.item}>

                        <View style={styles.itemLeft}>
                            <View style={styles.square}></View>
                            <Text>
                                {props.post.expirationDate && "Expiration date: " + props.post.expirationDate.split('T')[0]}
                            </Text>
                        </View>
                        <View style={styles.circular}></View>
                    </View>
                    <View style={styles.item}>

                        <View style={styles.itemLeft}>
                            <View style={styles.square}></View>
                            <Text>
                                {"Organization: " + props.organization}
                            </Text>
                        </View>
                        <View style={styles.circular}></View>
                    </View>


                </View>

                {props.post.filePath && props.post.filePath.match(patt1)[0] == '.jpg' &&
                <View style={styles.button}>
                    <Button title="Click here to watch image" color={'#3f51b5'}
                            onPress={() => props.navigation.navigate('HistoryPostFile', {
                                file: props.post.filePath
                            })}
                    />
                </View>
                }
                {props.post.filePath && props.post.filePath.match(patt1)[0] == '.png' &&
                <View style={styles.button}>
                    <Button title="Click here to watch image" color={'#3f51b5'}
                            onPress={() => props.navigation.navigate('HistoryPostFile', {
                                file: props.post.filePath
                            })}
                    />
                </View>
                }
                {props.post.filePath && props.post.filePath.match(patt1)[0] == '.pdf' &&

                <View>
                    <Button title="Click here to watch pdf file" color={'#3f51b5'}
                            onPress={() => props.navigation.navigate('HistoryPostFile', {
                                file: props.post.filePath
                            })}
                    />
                </View>

                }
            </View>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED'
    },
    wrapper: {
        paddingTop: 30,
        paddingHorizontal: 20
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    items: {marginTop: 30},
    item: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20

    },
    button: {
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 0,
        fontSize: 10
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#3f51b5',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15
    },
    itemText: {
        maxWidth: '80%'
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#3f51b5',
        borderWidth: 2,
        borderRadius: 5
    }


});

const mapStateToProps = (state) => ({
    post: state.post.post,
    organization: state.user.organization,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
})

export default connect(mapStateToProps, {getPost})(DetailsPostScreen)

