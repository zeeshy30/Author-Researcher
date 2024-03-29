import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Rating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../BaseStyles';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

export default QuoteTile = props => {
    const [showRatingDialog, setShowRatingDialog] = useState(false);
    const [rating, setRating] = useState(props.rating || 0);

    const addRating = (quoteID, userID, ratingGiven) => {
        const rate = {}
        rate[userID] = ratingGiven;
        firebase.firestore().collection('Quotes').doc(quoteID).update({
            rating: { ...props.rating, ...rate },
        });

        setShowRatingDialog(false);
        setRating({ ...rating, ...rate });
    };

    const totalRating = () => {
        if (Object.keys(rating).length === 0)
            return 0;
        const sum = Object.values(rating).reduce((acc, val) => acc + val);
        return sum / Object.keys(rating).length;
    };

    return (
        <View style={styles.tileContainer}>
            <View style={styles.row}>
                <Rating
                    type='custom'
                    tintColor={colors.tileBackgroundColor}
                    imageSize={16}
                    showRating={false}
                    fractions={1}
                    startingValue={totalRating()}
                    readonly
                />

                {props.isNotAuthor &&
                    <>
                        <Icon
                            style={{ marginLeft: 5 }}
                            name='rate-review'
                            color='orange'
                            onPress={() => setShowRatingDialog(true)}
                            size={17}
                        />
                        <RatingDialog
                            showDialog={showRatingDialog}
                            closeDialog={() => setShowRatingDialog(false)}
                            initialValue={rating[props.userID] || 0}
                            onSubmit={rating => addRating(props.id, props.userID, rating)}
                        />
                    </>}
                <View style={styles.detailBox}>
                    <Text style={{ flexWrap: 'wrap' }}> {props.quoteIdea}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View>
                    <View style={styles.price}>
                        <Text> ${props.price} </Text>
                    </View>
                </View>
                <ScrollView style={styles.detailBox}>
                    <Text style={{ flexWrap: 'wrap' }}> {props.quotation}</Text>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tileContainer: {
        width: '90%',
        backgroundColor: colors.tileBackgroundColor,
        padding: 5,
        margin: 5,
        fontWeight: 'bold'
    },
    row: {
        width: '100%',
        maxHeight: 150,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        fontWeight: 'bold'
    },
    col: {
        marginRight: 10,
        marginLeft: 10,
        flexDirection: 'row',
        fontWeight: 'bold'
    },
    detailBox: {
        backgroundColor: colors.tileContentColor,
        flex: 1,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#D7D7D7',
        padding: 2.5,
        marginLeft: 5,
        zIndex: 999,
        fontWeight: 'bold'
    },
    price: {
        backgroundColor: 'grey',
        maxHeight: 30,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#000',
        padding: 2.5,
        marginLeft: 5,
        fontWeight: 'bold'
    }
});