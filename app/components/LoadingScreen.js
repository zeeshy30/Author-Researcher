import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";


import { colors } from '../BaseStyles';

export default InitialScreen = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.button} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    }
})