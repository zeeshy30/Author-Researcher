import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Rating } from 'react-native-ratings';
import { BlurView } from "@react-native-community/blur";
import Icons from 'react-native-vector-icons/Entypo';


export default QuoteTile = props => {
    return (
        <View style={styles.tileContainer}>
            <View style={styles.row}>
                <Rating
                    type='custom'
                    tintColor='#FFE6CD'
                    imageSize={16}
                    showRating={false}
                    fractions={1}
                    startingValue={3.3}
                    readonly
                />
                <View style={styles.detailBox}>
                    <Text style={{ flexWrap: 'wrap' }}> {props.quoteIdea}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.price}>
                    <Text> ${props.price} </Text>
                </View>
                {/* <BlurView
                    style={styles.detailBox}
                    blurType="light"
                    blurAmount={100}
                    reducedTransparencyFallbackColor="white"> */}
                <ScrollView style={styles.detailBox}>
                    <Text style={{ flexWrap: 'wrap' }}> {props.quotation}</Text>
                </ScrollView>
                {/* </BlurView> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tileContainer: {
        width: '90%',
        backgroundColor: '#FFE6CD',
        padding: 5,
        margin: 5,
        fontWeight:'bold'
    },
    row: {
        width: '100%',
        maxHeight: 150,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        fontWeight:'bold'
    },
    col: {
        marginRight: 10,
        marginLeft: 10,
        flexDirection: 'row',
        fontWeight:'bold'
    },
    detailBox: {
        backgroundColor: '#FFCE9B',
        flex: 1,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        padding: 2.5,
        marginLeft: 5,
        zIndex: 999,
        fontWeight:'bold'
    },
    price: {
        backgroundColor: 'grey',
        maxHeight: 30,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        padding: 2.5,
        marginLeft: 5,
        fontWeight:'bold'
    }
});