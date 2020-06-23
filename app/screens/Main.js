import * as React from 'react';
import { View, Text, Button,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    TouchableRipple,
    Switch,
  } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Search from './Search';
function Feed({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>HelloWorld</Text>
      <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
      <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
    </View>
  );
}
function Profile() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile Screen</Text>
      </View>
    );
}
function Searchs() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Chat Screen</Text>
      <Search/>
    </View>
   
    )};


function Chat() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Chat Screen</Text>
    </View>
  );
}
function Statistics() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Chat Screen</Text>
      </View>
    );
  }
function Notifications() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Notification Screen</Text>
      </View>
    );
  }

function CustomDrawerContent(props) {
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
                <View style={styles.row}>
                    <View style={styles.section}>
                    <Paragraph style={[styles.paragraph, styles.caption]}>
                        202
                    </Paragraph>
                    <Caption style={styles.caption}>Following</Caption>
                    </View>
                    <View style={styles.section}>
                    <Paragraph style={[styles.paragraph, styles.caption]}>
                        159
                    </Paragraph>
                    <Caption style={styles.caption}>Followers</Caption>
                    </View>
                </View>
                </View>
                </View>
            <DrawerItem icon={({color, size}) => (
                <Icon name="home-outline" 
                color={color}
                size={size}
                />
                )}
                label="Home"
                onPress={() => {props.navigation.navigate('Chat')}}/>
            <DrawerItem icon={({color, size}) => (
                <Icon name="account" 
                color={color}
                size={size}
                />
                )}
                label="Profile"
                onPress={() => {props.navigation.navigate('Home')}}/>
           <DrawerItem icon={({color, size}) => (
                <Icon name="magnify" 
                color={color}
                size={size}
                />
                )}
                label="Search"
                onPress={() => {props.navigation.navigate('Searchs')}}/>
                <DrawerItem icon={({color, size}) => (
                <Icon name="signal" 
                color={color}
                size={size}
                />
                )}
                label="Statistics"
                onPress={() => {props.navigation.navigate('Chat')}}/>
                 <DrawerItem icon={({color, size}) => (
                <Icon name="playlist-edit" 
                color={color}
                size={size}
                />
                )}
                label="Add Reference"
                onPress={() => {props.navigation.navigate('Chat')}}/>
                <DrawerItem icon={({color, size}) => (
                <Icon name="chat" 
                color={color}
                size={size}
                />
                )}
                label="Chat"
                onPress={() => {props.navigation.navigate('Chat')}}/>
                
           {/* <DrawerItemList {...props} />*/}
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Searchs" component={Searchs} />
      <Drawer.Screen name="Chat" component={Chat} />
      <Drawer.Screen name="Statistics" component={Statistics} />
      <Drawer.Screen name="Notifications" component={Notifications} />
    </Drawer.Navigator>
  );
}

export default function Main() {
  return (
     
    <NavigationContainer>
      <MyDrawer />
      <Text>Hello.............</Text>
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