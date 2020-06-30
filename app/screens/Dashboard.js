import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, fontSizes } from '../BaseStyles';

export default Dashboard = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.ResearcherButton}
                onPress={() => Actions.authorcontrolpanel()}
            >

                <Text style={styles.signupButton}>Author</Text>

            </TouchableOpacity>

            <TouchableOpacity
                style={styles.ResearcherButton}
                onPress={() => Actions.search()}
            >
                <Text style={styles.signupButton}>Researcher</Text>
            </TouchableOpacity>
            {/*<TouchableOpacity
                style={styles.ResearcherButton}
                onPress={() => Actions.admindashboard()}
            >
                <Text style={styles.signupButton}>Admin</Text>
            </TouchableOpacity>*/}
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
        backgroundColor: '#08B4C5',
        borderRadius: 25,
        marginVertical: 25,
        paddingVertical: 12,
    },
    signupButton: {
        color: 'white',
        fontSize: fontSizes.large,
        fontWeight: 'bold',
        fontSize: 30
    }

})
