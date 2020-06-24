import React from 'react';
import { Text, View } from 'react-native';
import Menu from './Menu';

export default AddProfile = ({ navigation }) => {
    return (
        <>
            <Menu navigation={navigation} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Add A Reference</Text>
            </View>
        </>
    );
}