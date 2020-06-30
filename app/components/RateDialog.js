import React, { useState } from 'react';
import { Rating } from 'react-native-ratings';
import { ConfirmDialog } from 'react-native-simple-dialogs';


export default RatingDialog = props => {
    const [rate, setRate] = useState(props.initialValue || 0);

    const onCancel = () => {
        setRate(0);
        props.closeDialog();
    }

    return (
        <ConfirmDialog
            visible={props.showDialog}
            title="Rate it!"
            onTouchOutside={onCancel}
            positiveButton={{
                title: "Submit",
                onPress: () => props.onSubmit(rate),
            }}
            negativeButton={{
                title: "Cancel",
                onPress: onCancel,
            }}
        >
            <Rating
                type='custom'
                imageSize={20}
                showRating={true}
                fractions={1}
                startingValue={rate}
                onFinishRating={val => setRate(val)}
            />
        </ConfirmDialog>
    );
}
