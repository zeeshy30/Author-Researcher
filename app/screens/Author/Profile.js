import React,{component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
  } from 'react-native';
import Menu from '../../components/Menu';
import { AsyncStorage } from 'react-native';
/*var obj = {email:'123'};
  storeData = async () => {
          try {
            const value = await AsyncStorage.getItem('Users');
            if (value !== null) {
              // We have data!!
              console.log(value);
            }
          } catch (error) {
            console.log('eeeee');
          }
    }
    console.log(storeData)
        storeData();
        console.log('eeeee');*/
export default class Profile extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      obj: {},
    }
  }
    /*storeData = async () => {
            try {
              const value = await AsyncStorage.getItem('Users');
              if (value !== null) {
                // We have data!!
                console.log(value);
              }
            } catch (error) {
              console.log('eeeee');
            }
      }
  this.storeData()*/
  componentDidMount() {
    AsyncStorage.getItem('loginDetails').then((value) => {
      console.log("here");
      this.setState({obj: JSON.parse(value)});
      alert(value)
  })
  
  }
  render()
      {return (
            <>
             <Menu navigation={this.props.navigation} />
              
          <View style={styles.container}>
              <View style={styles.header}></View>
              <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
              <View style={styles.body}>
                <View style={styles.bodyContent}>
      <Text style={styles.name}>{this.state.obj.fullname}</Text>
                  <Text style={styles.info}>UX Designer / Mobile developer</Text>
                  <Text style={styles.info}>{this.state.obj.email}</Text>
                  <Text style={styles.info}>{this.state.obj.language}</Text>
                  <Text style={styles.info}>{this.state.obj.qualification}</Text>
                  <Text style={styles.description}>{this.state.obj.bio}</Text>
                </View>
            </View>
        </View>
        </>
            
        )
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:20,
    color: "#000000",
    marginTop:10,
    fontWeight:'bold',

  },
  description:{
    fontSize:16,
    color: "#000000",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});