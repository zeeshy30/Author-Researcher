import React from 'react';
import { StyleSheet, TextInput, } from 'react-native';
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
            keyboardType={props.placeholder === "Email" ? "email-address" : "default"}
            onSubmitEditing={props.onSubmitEditing}
            value={props.value}
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