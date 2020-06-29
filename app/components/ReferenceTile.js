import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-ratings';
import Icons from 'react-native-vector-icons/Entypo';
import Communications from 'react-native-communications';
import { SliderBox } from "react-native-image-slider-box";
import QuoteTile from './QuoteTile';

/*
props : {
    images,
    title,
    authorname,
    authorbio,
    book summary,
    rating,
    authoremail,
    bookvideo,
}
*/


export default ReferenceTile = props => {
    const [showQuotes, setShowQuote] = useState(false);

    return (
        <View style={styles.tileContainer}>
            <TouchableOpacity style={styles.row} onPress={() => setShowQuote(!showQuotes)}>
                {!showQuotes && <Rating
                    type='custom'
                    tintColor='#FFE6CD'
                    imageSize={16}
                    showRating={false}
                    fractions={1}
                    startingValue={props.rating}
                    readonly
                />}
                <View style={styles.col}>
                    <Icons
                        style={{ marginRight: 5 }}
                        name='email'
                        color='orange'
                        size={17}
                        onPress={() => Communications.email([props.authorEmail], null, null, 'Demo Subject', 'Demo Content for the mail')}
                    />
                    <Icons name='controller-play' color='orange' size={17} />
                </View>
                <Text style={{ flex: 1, flexWrap: 'wrap' }}> {props.title} ({props.authorName}) </Text>
            </TouchableOpacity>
            {showQuotes === false
                ? (<View style={styles.row}>
                    <SliderBox
                        parentWidth={100}
                        sliderBoxHeight={120}
                        images={props.images}
                    />
                    <ScrollView style={styles.detailBox}>
                        <Text style={{ flex: 1, flexWrap: 'wrap' }}> {props.authorBio}</Text>

                    </ScrollView>
                    <ScrollView style={styles.detailBox}>
                        <Text style={{ flex: 1, flexWrap: 'wrap' }}> {props.summary}</Text>

                    </ScrollView>
                </View>) : (props.quotes.map((quote, index) => {
                    return <QuoteTile key={index} {...quote} />
                }
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    tileContainer: {
        width: '90%',
        backgroundColor: '#FFE6CD',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        padding: 10,
        margin: 20,
    },
    row: {
        width: '100%',
        maxHeight: 150,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    col: {
        marginRight: 10,
        marginLeft: 10,
        flexDirection: 'row',
    },
    detailBox: {
        width: '30%',
        backgroundColor: '#FFCE9B',
        maxHeight: 120,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        padding: 5,
        marginLeft: 2.5,
    }
});