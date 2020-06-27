import React, { Component } from 'react'
import Communications from 'react-native-communications';
export default class email extends Component {
    render() {
        return (
            <div>
                <TouchableOpacity 
                        style = {styles.button}
                        onPress={() => Communications.email(['aboutreact11@gmail.com', 'hello@aboutreact.com'],null,null,'Demo Subject','Demo Content for the mail')}>
                        {/*email(to, cc, bcc, subject, body)*/}
                            <Text style={styles.text}>
                            Send an Email
                            </Text>
                </TouchableOpacity>
            </div>
        )
    }
}
const styles = StyleSheet.create({
    inputContainer: {
        paddingTop: 10
      },
      text: {
        borderColor: '#CCCCCC',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: 70,
        fontSize: 25,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop:35
      },
      header: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold'
      },
      button:{
        height: 70,
        marginBottom:35
      },
      saveButton: {
        borderWidth: 1,
        borderColor: '#007BFF',
        backgroundColor: '#007BFF',
        padding: 15,
        margin: 5
      }
      

});
