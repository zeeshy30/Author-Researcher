import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Menu from './Menu';

export default Profile = ({ navigation }) => {
    return (
        <>
            <Menu navigation={navigation} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Profile Screen</Text>
            </View>
        </>
    );
}