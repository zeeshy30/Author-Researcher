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
        width: '80%',
        backgroundColor: '#F2F3F4',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: fontSizes.normal,
        marginVertical: 10,
        opacity: 0.5
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: fontSizes.normal,
        color:'#000000',
        backgroundColor: '#F2F3F4',
        opacity: 1
    },
});