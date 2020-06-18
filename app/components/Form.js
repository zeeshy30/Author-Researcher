import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { colors, fontSizes } from '../BaseStyles';

// Form.propTypes = {
//     placeholder: PropTypes.string.isRequired,
//     onUpdate: PropTypes.func.isRequired,
//     secureTextEntry: PropTypes.bool,
//     onSubmitEditing: PropTypes.func,
// };

export default Form = React.forwardRef((props, ref) => {
    return (
        <TextInput style={styles.inputBox}
            onChangeText={(text) => props.onUpdate(text)}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder={props.placeholder}
            placeholderTextColor={colors.inputText}
            secureTextEntry={props.secureTextEntry}
            selectionColor="#fff"
            onSubmitEditing={props.onSubmitEditing}
            ref={ref}
        />
    )
})

Form.displayName = 'Form'

Form.defaultProps = {
    secureTextEntry: false,
    onSubmitEditing: () => { },
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputBox: {
        width: 300,
        backgroundColor: '#eeeeee',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: fontSizes.normal,
        color: colors.inputBox,
        marginVertical: 10,
    }
});