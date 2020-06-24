import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

export default Menu = ({ navigation }) => {
    return (
        <View>
            <TouchableOpacity
                style={{ marginLeft: 10, width: 'auto' }}
                onPress={() => {
                    navigation.toggleDrawer()
                }} >
                <Icon
                    name="menu"
                    size={26}
                />
            </TouchableOpacity>
        </View >
    );
}