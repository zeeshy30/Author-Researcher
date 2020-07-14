import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/Feather';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default Earn = props => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Earning"
                component={Earning}
                options={{
                    headerLeft: () => (
                        <Icon
                            name='menu'
                            color='#000'
                            size={26}
                            style={{ marginLeft: 10 }}
                            onPress={() => props.navigation.openDrawer()}
                        />
                    ),
                    headerStyle: {
                        backgroundColor: '#eee',
                    }
                }}
            />
        </Stack.Navigator>

    );
}


class Earning extends Component {

    render() {
        return (
            <View >
                <Text style={styles.text}>Total Income : 50</Text>
                <Dropdown
                    containerStyle={styles.dropdownStyle}
                    pickerStyle={styles.pickerStyle}
                    label='Select Reference '
                    data={[{ value: 'A' }, { value: 'B' }]}
                    onChangeText={value => this.setState({ amount_per_reference: value })}
                />
                <Text style={styles.text}>Reference amount : 50</Text>
                <Dropdown
                    containerStyle={styles.dropdownStyle}
                    pickerStyle={styles.pickerStyle}
                    label='Select Quote'
                    data={[{ value: 'A' }, { value: 'B' }]}
                    onChangeText={value => this.setState({ amount_per_quote: value })}
                />
                <Text style={styles.text}>Quotes amount : 50</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },


    text: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
        backgroundColor: 'white',
        textAlign: 'center',
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dropdownStyle: {
        width: 390,
        borderRadius: 1,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        marginVertical: 10,
        marginLeft: 10,
        marginLeft: 10,
        marginTop: 20,
        fontSize: 30,
        fontWeight: 'bold',
    },
    pickerStyle: {
        width: 390,
        borderRadius: 25,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        marginVertical: 10,
        fontSize: 30,
        fontWeight: 'bold',
    },
});