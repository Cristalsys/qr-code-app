import React from "react";
import {View, Image, Dimensions, Button, StyleSheet} from "react-native";

import PDFReader from 'rn-pdf-reader-js'


const DetailsPostFileScreen = ({route}) => {

    const patt1 = /\.[0-9a-z]+$/i;
    const connection = 'http://192.168.0.104:5000'

    return (
        <View style={styles.container}>
            {route.params.file && route.params.file.match(patt1)[0] == '.jpg' &&
            <Image
                style={{
                    width: Dimensions.get('window').width ,
                    height: Dimensions.get('window').height - '50'
                }}
                source={{
                    uri: route.params.file ?
                        `${connection}/uploads/${route.params.file.slice(8)}`
                        : null
                }}
            />
            }
            {route.params.file && route.params.file.match(patt1)[0] == '.png' &&
            <Image
                style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height - 50,
                    padding: 10
                }}
                source={{
                    uri: route.params.file ?
                        `${connection}/uploads/${route.params.file.slice(8)}`
                        : null
                }}
            />
            }
            {route.params.file && route.params.file.match(patt1)[0] == '.pdf' &&
            <PDFReader
                style={{
                    width: Dimensions.get('window').width ,
                    height: Dimensions.get('window').height ,
                    padding: 30
                }}
                source={{
                    uri: `${connection}/uploads/${route.params.file.slice(8)}`,
                }}
            />
            }
        </View>
    )
}

export default DetailsPostFileScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }

});