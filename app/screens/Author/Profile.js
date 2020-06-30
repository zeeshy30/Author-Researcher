import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import Menu from '../../components/Menu';
import AsyncStorage from '@react-native-community/async-storage';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileDetails: {},
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('loginDetails').then((value) => {
            this.setState({ profileDetails: JSON.parse(value) });
        })

    }
    render() {
        const {
            fullName,
            email,
            bio,
            language,
            qualification,
            imageUrl,
        } = this.state.profileDetails;

        return (
            <>
                <Menu navigation={this.props.navigation} />
                <View style={styles.container}>
                    <View style={styles.header}></View>
                    <Image style={styles.avatar} source={{ uri: imageUrl }} />
                    <View style={styles.body}>
                        <View style={styles.bodyContent}>
                            <Text style={styles.name}>{fullName}</Text>
                            <Text style={styles.description}>{bio}</Text>
                            <Text style={styles.info}>Email: {email}</Text>
                            <Text style={styles.info}>Language: {language}</Text>
                            <Text style={styles.info}>Qualification: {qualification}</Text>
                        </View>
                    </View>
                </View>
            </>

        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#00BFFF",
        height: 200,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: "#000000",
        fontWeight: "600"
    },
    info: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#000000",
        marginTop: 10,
    },
    description: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#000000",
        marginTop: 10,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#00BFFF",
    },
});