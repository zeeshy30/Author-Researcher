import React ,{useState, Component }from 'react';
import { SearchBar } from 'react-native-elements';
import { Text, View,StyleSheet } from 'react-native';
import { Image } from 'react-native'
export default class Search extends React.Component{
    state = {
        search: '',
      };
    
      updateSearch = (search) => {
        this.setState({ search });
      };
    
      render() {
        const { search } = this.state;
        return (
         
        <View style = {styles.container}>

        <Text style = {styles.title}>Author Search</Text>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={search}
            fontColor="#c6c6c6"
            iconColor="#c6c6c6"
            shadowColor="#282828"
            cancelIconColor="#c6c6c6"
            backgroundColor="#353d5e"
            containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5 ,

            width: 400,}}
            
          />
           </View>  
        );
      }
    }

const styles = StyleSheet.create({
    container:
    {
        flex:1,
        backgroundColor: '#353d5e',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    title:{
        color:'#000',
        fontSize:32,
        fontWeight:'700',
        textAlign :'center',
        marginBottom: 20
    },
    searchbox:{
        color:'#000',
        fontSize:20,
        fontWeight:'300',
        padding: 20,
        width:'100%',
        backgroundColor: '#fff',
        borderRadius:8,
        marginBottom: 40
    }
});