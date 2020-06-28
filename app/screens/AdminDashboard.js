import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { colors, fontSizes } from '../BaseStyles';

export default AdminDashboard = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.ResearcherButton}
                onPress={() => Actions.admin()}
            >
                <Text style={styles.signupButton}>General Information</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.ResearcherButton}
                onPress={() => Actions.income()}
            >
                <Text style={styles.signupButton}>Financial Information</Text>
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
    ResearcherButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        backgroundColor: '#f2f2f2',
        borderRadius: 25,
        marginVertical: 25,
    },
    signupButton: {
        color: colors.inputText,
        fontSize: fontSizes.large,
        fontWeight: 'bold',
        fontSize: 30
    }
})
