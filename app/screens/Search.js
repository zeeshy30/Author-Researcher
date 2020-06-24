import React from 'react';
import { SearchBar } from 'react-native-elements';
import { Text, View, StyleSheet } from 'react-native';
import { colors, fontSizes } from '../BaseStyles';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
        }
    }

    updateSearch = (search) => {
        this.setState({ search });
    };

    render() {
        const { search } = this.state;
        return (

            <View style={styles.container}>
                <SearchBar
                    placeholder="Search"
                    onChangeText={this.updateSearch}
                    value={search}
                    fontColor={colors.inputText}
                    lightTheme
                    containerStyle={{
                        backgroundColor: 'white',
                        padding: 0,
                        width: '100%',

                    }}

                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 50,
    },
    searchbox: {
        fontSize: fontSizes.normal,
        fontWeight: '300',
        width: '100%',
        borderRadius: 8,
        marginBottom: 40
    }
});