import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
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
import Profile from './Author/Profile';
import Statistics from './Author/Statistics';
import AddReference from './Author/AddReference';
import Chat from './Author/Chat';

function CustomDrawerContent(props) {
    const { navigate } = props.navigation;
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
                            uri:
                                'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
                        }}
                        size={50}
                    />
                    <Title style={styles.title}>Dawid Urbaniak</Title>
                    <Caption style={styles.caption}>@trensik</Caption>
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
                <Icon name="chat"
                    color={color}
                    size={size}
                />
            )}
                label="Chat"
                onPress={() => { navigate('Chat') }} />
        </DrawerContentScrollView>
    );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Statistics" component={Statistics} />
            <Drawer.Screen name="AddReference" component={AddReference} />
            <Drawer.Screen name="Chat" component={Chat} />
        </Drawer.Navigator>
    );
}

export default function AuthorDashboard() {
    return (
        <NavigationContainer>
            <MyDrawer />
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