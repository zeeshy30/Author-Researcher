import React, { Component } from 'react'
import {
   StyleSheet,
    ScrollView,
    TextInput,
    Keyboard,TouchableOpacity,
    View,Text
  } from 'react-native';
import Menu from '../../components/Menu';
export default class AddQuote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Style: '',
            Quotation: '',
            Price: '',
            Booknumber: '',
        }
    }
    setQuotation = val => {
        this.setState({ Quotation: val });
    }
    setStyle = val => {
        this.setState({ Style: val });
    }
    setPrice = val => {
        this.setState({ Price: val });
    }
    setBooknumber = val => {
        this.setState({ Booknumber: val });
    }
    
    render() {
        return (
            <>
            <Menu navigation={this.props.navigation} />
            <View styles= {styles.inputContainer}>
                
          <Text style={styles.header}>AddQuote</Text>
        
                <Text>{'\n'}</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Your Quotation"
                    maxLength={200}
                    value={this.state.Quotation}
                    onChangeText={this.setQuotation}/>
                    <TextInput
                    style={styles.textInput}
                    placeholder="Your Style"
                    maxLength={200}
                    value={this.state.Style}
                    onChangeText={this.setStyle}/>
                    <TextInput
                    style={styles.textInput}
                    placeholder="Your Price"
                    maxLength={200}
                    value={this.state.Price}
                    onChangeText={this.setPrice}/>
                    <TextInput
                    style={styles.textInput}
                    placeholder="Booknumber"
                    maxLength={200}
                    value={this.state.Booknumber}
                    onChangeText={this.setBooknumber}/>
                    <Text>{'\n'}</Text>
                    <TouchableOpacity
                        style={styles.saveButton}
                    >
                        <Text style={styles.saveButtonText}>Save</Text>
                     </TouchableOpacity>
               
            </View>
           
            </>
        )
    }
}


const styles = StyleSheet.create({
    inputContainer: {
        paddingTop: 10
      },
      textInput: {
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
      SubmitButton:{
        height: 70,
        marginBottom:35
      },
      saveButton: {
        borderWidth: 1,
        borderColor: '#007BFF',
        backgroundColor: '#007BFF',
        padding: 15,
        margin: 5
      },
      saveButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center'
      }
      

});
