import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-ratings';
import Icons from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Communications from 'react-native-communications';
import { SliderBox } from "react-native-image-slider-box";
import { colors } from '../BaseStyles';


import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

import QuoteTile from './QuoteTile';
import RatingDialog from './RateDialog';


export default ReferenceTile = props => {
    const [showQuotes, setShowQuote] = useState(false);
    const [showRatingDialog, setShowRatingDialog] = useState(false);
    const [rating, setRating] = useState(props.rating);
    const [likeBy, setLikeBy] = useState(props.likeBy);
    const [like, setLike] = useState(props.likeBy.includes(props.userID));
    const isNotAuthor = props.userID !== props.authorID;

    const addRating = (refID, userID, ratingGiven) => {
        const rate = {}
        rate[userID] = ratingGiven;
        firebase.firestore().collection('References').doc(refID).update({
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

    const showOrHideQuote = async () => {
        if (!showQuotes && isNotAuthor) {
            firebase.firestore().collection('References').doc(props.id).update({
                views: [...props.views, props.userID],
            });
        }
        setShowQuote(!showQuotes);
    };

    const updateLikes = async () => {

        if (like) {
            const fitlered = likeBy.filter(val => val != props.userID)
            firebase.firestore().collection('References').doc(props.id).update({
                likeBy: fitlered,
            });
            setLikeBy(fitlered);
        } else {
            firebase.firestore().collection('References').doc(props.id).update({
                likeBy: [...likeBy, props.userID],
            });
            setLikeBy([...likeBy, props.userID]);
        }
        setLike(!like);
    }


    return (
        <View style={styles.tileContainer}>
            <TouchableOpacity style={styles.row} onPress={showOrHideQuote}>
                {!showQuotes && <Rating
                    type='custom'
                    tintColor={colors.tileBackgroundColor}
                    imageSize={16}
                    showRating={false}
                    fractions={1}
                    startingValue={totalRating()}
                    readonly
                />}
                <View style={styles.col}>
                    {isNotAuthor && !showQuotes && <AntIcon
                        style={{ marginRight: 5 }}
                        name={like ? "like1" : "like2"}
                        size={17}
                        onPress={updateLikes}
                    />}
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
                {(isNotAuthor && !showQuotes) && (<>
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
                        initialValue={rating[props.userID] ? rating[props.userID] : 0}
                        onSubmit={rating => addRating(props.id, props.userID, rating)}
                    />
                </>)}
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
                    return <QuoteTile
                        key={index}
                        {...quote}
                        userID={props.userID}
                        isNotAuthor={isNotAuthor} />
                }
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    tileContainer: {
        width: '90%',
        backgroundColor: colors.tileBackgroundColor,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        padding: 10,
        margin: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
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
        backgroundColor: colors.tileContentColor,
        maxHeight: 120,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        padding: 5,
        marginLeft: 2.5,
    }
});