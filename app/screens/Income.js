import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';


export default class Income extends Component {

    render() {
        return (
            <>
                <Menu navigation={this.props.navigation} />
                <View >
                    <Text style={styles.text}>Total Income : 50</Text>
                    <Dropdown
                        containerStyle={styles.dropdownStyle}
                        pickerStyle={styles.pickerStyle}
                        label='Select Author '
                        data={[{ value: 'A' }, { value: 'B' }]}
                        onChangeText={value => this.setState({ Author_name: value })}
                    />
                    <Dropdown
                        containerStyle={styles.dropdownStyle}
                        pickerStyle={styles.pickerStyle}
                        label='Select Reference '
                        data={[{ value: 'A' }, { value: 'B' }]}
                        onChangeText={value => this.setState({ Reference_name: value })}
                    />
                    <Text style={styles.text}>Reference amount : 50</Text>
                    <Dropdown
                        containerStyle={styles.dropdownStyle}
                        pickerStyle={styles.pickerStyle}
                        label='Select Category'
                        data={[{ value: 'A' }, { value: 'B' }]}
                        onChangeText={value => this.setState({ Category_name: value })}
                    />
                    <Text style={styles.text}>Quotes amount : 50</Text>
                </View>
            </>
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