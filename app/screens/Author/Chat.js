import React from 'react';
import { Text, View } from 'react-native';
import Menu from '../../components/Menu';

export default Chat = ({ navigation }) => {
    return (
        <>
            <Menu navigation={navigation} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Chat</Text>
            </View>
        </>
    );
}