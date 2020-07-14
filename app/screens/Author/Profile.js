import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import EditProfile from './EditProfile';

const Stack = createStackNavigator();
export default Profile = props => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerRight: () => (
                        <Icon
                            name='edit'
                            color='#000'
                            size={22}
                            style={{ marginRight: 10 }}
                            onPress={() => props.navigation.navigate('Edit Profile')}
                        />
                    ),
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
            <Stack.Screen
                name="Edit Profile"
                component={EditProfile}
                options={{
                    headerStyle: {
                        backgroundColor: '#eee',
                    }
                }}
            />
        </Stack.Navigator>

    );
}

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileDetails: {},
        }
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', async () => {
            const profileDetailss = await AsyncStorage.getItem('loginDetails');
            this.setState({ profileDetails: JSON.parse(profileDetailss) });
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
            dateOfBirth,
            gender,
            city,
            country,
            phoneNumber,
        } = this.state.profileDetails;
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Image style={styles.avatar} source={{ uri: imageUrl || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }} />
                        <View style={styles.personalDetails}>
                            <Text style={styles.name}>{fullName}</Text>
                            <Text style={styles.info}>{email}</Text>
                        </View>
                    </View>
                    <View style={styles.body}>
                        <Text style={styles.description}>{bio}</Text>
                        <View style={styles.extraInfo} >
                            <Text style={styles.info}>Date Of Birth: {dateOfBirth}</Text>
                            <Text style={styles.info}>Gender: {gender}</Text>
                            <Text style={styles.info}>Language: {language}</Text>
                            <Text style={styles.info}>Qualification: {qualification}</Text>
                            {!this.state.profileDetails.hideNumber && (<Text style={styles.info}>Phone Number: {phoneNumber}</Text>)}
                            <Text style={styles.info}>Location: {city}, {country}</Text>
                        </View>
                    </View>
                </View>
            </>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    header: {
        backgroundColor: '#77ccff',
        flexDirection: 'row',
        width: '100%',
        paddingTop: 20,
        paddingBottom: 20,
        height: 170,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        marginLeft: 10
    },
    personalDetails: {
        alignSelf: 'center',
        marginLeft: 70
    },
    body: {
        marginTop: 20,
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: "#000000",
        fontWeight: "600"
    },
    email: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#000000",
        marginTop: 10,
    },
    description: {
        fontSize: 20,
        color: "#000000",
        marginTop: 10,
        textAlign: 'center'
    },
    extraInfo: {
        marginTop: 15,
    },
    info: {
        fontSize: 16,
        textAlign: 'center',
        color: "#000000",
        marginBottom: 5,
    }
});