import {Button, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {BarCodeScanner} from 'expo-barcode-scanner';
import {connect} from "react-redux";
import {addHistory} from "../redux/actions/historyActions";
import axios from "axios";

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 2,
        flexDirection: 'column'
    },
    layerTop: {
        flex: 1,
        backgroundColor: opacity
    },
    layerCenter: {
        flex: 2,
        flexDirection: 'row'
    },
    layerLeft: {
        flex: 2,
        backgroundColor: opacity
    },
    focused: {
        flex: 10
    },
    layerRight: {
        flex: 2,
        backgroundColor: opacity
    },
    layerBottom: {
        flex: 1,
        backgroundColor: opacity
    },
});

const HomeScreen = (props) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {

        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();

    }, []);

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const handleBarCodeScanned = ({type, data}) => {
        setScanned(true);
        axios.post('http://172.16.63.215:5000/api/post/checkValidity', {body: data})
            .then((res) => {
                // if ('document id valid' === res.data.message) {
                    alert('document is valid')
                    props.addHistory({post: res.data.postId})
                    props.navigation.navigate('History')
                // }
            }).catch(() => {
            alert('document is not valid')
        })

    };

    return (
        <View style={styles.container1}>
            <Text>Home screen</Text>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={[StyleSheet.absoluteFill, styles.container]}
            >
                <View style={styles.layerTop}/>
                <View style={styles.layerCenter}>
                    <View style={styles.layerLeft}/>
                    <View style={styles.focused}/>
                    <View style={styles.layerRight}/>
                </View>
                <View style={styles.layerBottom}/>
            </BarCodeScanner>
            {scanned && <Button title={'Tap to Scan '} onPress={() => setScanned(false)}/>}
        </View>
    )
}


const mapStateToProps = (state) => ({
    post: state.post
})

export default connect(mapStateToProps, {addHistory})(HomeScreen)