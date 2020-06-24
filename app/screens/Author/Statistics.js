import React from 'react';
import { Text, View } from 'react-native';
import Menu from '../../components/Menu';

export default Statistics = ({ navigation }) => {
    return (
        <>
            <Menu navigation={navigation} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Statistics</Text>
            </View>
        </>
    );
}