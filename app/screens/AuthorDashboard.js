import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Actions } from 'react-native-router-flux';

import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer';
import {
    Avatar,
    Title,
    Caption,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

import Profile from './Author/Profile';
import Statistics from './Author/Statistics';
import AddReference from './Author/AddReference';
import Earning from './Author/Earning';

function CustomDrawerContent(props) {
    const { navigate } = props.navigation;

    const logout = async () => {
        await AsyncStorage.clear();
        await firebase.auth().signOut();
        Actions.initialscreen();
    };

    return (
        <DrawerContentScrollView {...props}>
            <View
                style={
                    styles.drawerContent
                }
            >
                <View style={styles.userInfoSection}>
                    <Avatar.Image
                        source={{
                            uri: props.profileImageUrl,
                        }}
                        size={50}
                    />
                    <Title style={styles.title}>{props.fullName}</Title>
                    <Caption style={styles.caption}>{props.email}</Caption>
                </View>
            </View>
            <DrawerItem icon={({ color, size }) => (
                <Icon name="account"
                    color={color}
                    size={size}
                />
            )}
                label="Profile"
                onPress={() => { navigate('Profile') }} />
            <DrawerItem icon={({ color, size }) => (
                <Icon name="signal"
                    color={color}
                    size={size}
                />
            )}
                label="Statistics"
                onPress={() => { navigate('Statistics') }} />
            <DrawerItem icon={({ color, size }) => (
                <Icon name="playlist-edit"
                    color={color}
                    size={size}
                />
            )}
                label="Add Reference"
                onPress={() => { navigate('AddReference') }} />
            <DrawerItem icon={({ color, size }) => (
                <Icon name="currency-usd"
                    color={color}
                    size={size}
                />
            )}
                label="Earning"
                onPress={() => { navigate('Earning') }} />
            <DrawerItem icon={({ color, size }) => (
                <Icon name="logout"
                    color={color}
                    size={size}
                />
            )}
                label="Log Out"
                onPress={logout} />
        </DrawerContentScrollView>
    );
}

const Drawer = createDrawerNavigator();

function MyDrawer(parentProps) {
    return (
        <Drawer.Navigator drawerContent={props =>
            <CustomDrawerContent
                {...props}
                fullName={parentProps.fullName}
                email={parentProps.email}
                profileImageUrl={parentProps.imageUrl}
            />}
        >
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Statistics" component={Statistics} />
            <Drawer.Screen name="AddReference" component={AddReference} />
            <Drawer.Screen name="Earning" component={Earning} />
        </Drawer.Navigator >
    );
}

export default function AuthorDashboard(props) {
    return (
        <NavigationContainer>
            <MyDrawer {...props} />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        marginTop: 20,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});