import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, fontSizes } from '../BaseStyles';

export default Button = props => {
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={props.onPress}>{props.text}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {
        width: 300,
        backgroundColor: colors.button,
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: fontSizes.normal,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
});