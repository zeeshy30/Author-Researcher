import React from 'react';
import { StyleSheet } from 'react-native';
import Textarea from 'react-native-textarea';
import { colors, fontSizes } from '../BaseStyles';


export default textarea = props => {
    return (
        <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.textarea}
            onChangeText={(text) => props.onUpdate(text)}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder={props.placeholder}
            placeholderTextColor={colors.inputText}
            selectionColor="#fff"
            defaultValue={props.value}
        />
    )
}

const styles = StyleSheet.create({
    textareaContainer: {
        width: 300,
        backgroundColor: '#eeeeee',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: fontSizes.normal,
        color: colors.inputBox,
        marginVertical: 10,
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: fontSizes.normal,
        color: colors.inputText,
    },
});