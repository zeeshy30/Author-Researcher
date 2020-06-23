import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { colors, fontSizes } from '../BaseStyles';

export default Dashboard = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.AuthorButton}
                onPress={() => alert('Cannot press this one')}
            >
                <Text style={styles.signupButton}>Author</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.ResearcherButton}
                onPress={() => Actions.main()}
            >
                <Text style={styles.signupButton}>Researcher</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 25,
        paddingBottom: 25,

    },
    AuthorButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        backgroundColor: colors.button,
        borderRadius: 25,
        marginVertical: 25,
        paddingVertical: 12,
    },
    ResearcherButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        backgroundColor: '#d67229',
        borderRadius: 25,
        marginVertical: 25,
        paddingVertical: 12,
    },
    signupButton: {
        color: colors.inputText,
        fontSize: fontSizes.large,
        fontWeight: '500',
    }
})
