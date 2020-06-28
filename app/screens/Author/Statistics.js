import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Menu from '../../components/Menu';
import { Dropdown } from 'react-native-material-dropdown';

export default class Statistics extends Component {

    render() {
        return (
            <>
                <Menu navigation={this.props.navigation} />
                <View >
                    <Text style={styles.text}>Number of References : 50</Text>
                    <Text style={styles.text}>Number of Views :50 </Text>
                    <Dropdown
                        containerStyle={styles.dropdownStyle}
                        pickerStyle={styles.pickerStyle}
                        label='Select Number of Views per reference'
                        data={[{ value: 'A' }, { value: 'B' }]}
                        onChangeText={value => this.setState({ View_per_reference: value })}
                    />
                    <Text style={styles.text}>Views : 50</Text>
                    <Text style={styles.text}>Number of Quotes : 50</Text>
                    <Dropdown
                        containerStyle={styles.dropdownStyle}
                        pickerStyle={styles.pickerStyle}
                        label='Number of Quotes per Reference'
                        data={[{ value: 'A' }, { value: 'B' }]}
                        onChangeText={value => this.setState({ Quote_per_reference: value })}
                    />
                    <Text style={styles.text}>Quotes : 50</Text>
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