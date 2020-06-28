import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';


export default class Admin extends React.Component {

    render() {
        return (
            <>
                <View >
                    <Text style={styles.text}>Number of Authors : 50</Text>
                    <Text style={styles.text}>    Number of References: 50 </Text>
                    <Dropdown
                        containerStyle={styles.dropdownStyle}
                        pickerStyle={styles.pickerStyle}
                        label='Select Author to view rating'
                        data={[{ value: 'A' }, { value: 'B' }]}
                        onChangeText={value => this.setState({ Author_name: value })}
                    />
                    <Dropdown
                        containerStyle={styles.dropdownStyle}
                        pickerStyle={styles.pickerStyle}
                        label='Number of View per Author'
                        data={[{ value: 'A' }, { value: 'B' }]}
                        onChangeText={value => this.setState({ View_per_author: value })}
                    />
                    <Dropdown
                        containerStyle={styles.dropdownStyle}
                        pickerStyle={styles.pickerStyle}
                        label='Number of Reference per classification'
                        data={[{ value: 'A' }, { value: 'B' }]}
                        onChangeText={value => this.setState({ Reference_per_classification: value })}
                    />
                    <Dropdown
                        containerStyle={styles.dropdownStyle}
                        pickerStyle={styles.pickerStyle}
                        label='Number of likes per Author'
                        data={[{ value: 'A' }, { value: 'B' }]}
                        onChangeText={value => this.setState({ like_per_author: value })}
                    />
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