import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View, Button, Alert, AsyncStorage} from 'react-native';

import AuthenticationDS  from '../../datastore/authentication';
import colors from "../../styling/colors";

class LoginScreen extends React.Component {

  state = {
    email :'',
    password: ''
  }
  handleEmail = (text) => {
    this.setState({ email: text })
  }
  handlePassword = (text) => {
    this.setState({ password: text })
  }

  signUp = () => {
    this.props.navigation.navigate('SignUp')
  }

  performLogin = async () => {
    const res = await AuthenticationDS.login(this.state.email, this.state.password)

    switch (res.code) {
        case 'UNAUTHORIZED':
          Alert.alert(res.text);
          break;
        case 'TOKEN':
          AsyncStorage.setItem('userToken', res.text); // Waiting to make sure the state is oeky
          AuthenticationDS.validateToken(res.text);
          this.props.navigation.navigate('App');
          break;
        default:
          Alert.alert("Unexpected response");
          break;
        }
  }
  ////// !!!!!!! ///////
  /// This is just for testing
  performTestLogin = async () => {
    const res = await AuthenticationDS.login('reda@aissaoui.org', 'Helloworld')
    switch (res.code) {
        case 'UNAUTHORIZED':
          Alert.alert(res.text);
          break;
        case 'TOKEN':
          AsyncStorage.setItem('userToken', res.text);
          this.props.navigation.navigate('App');
          break;
        default:
          Alert.alert("Unexpected response");
          break;
        }
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Kwigo</Text>
        <Text style={styles.instructions}>We will get you anywhere</Text>
        <View style={styles.formContainer}>
        <TextInput style = {styles.input}
               autoCapitalize="none"
               onSubmitEditing={() => this.passwordInput.focus()}
               onChangeText= {this.handleEmail}
               autoCorrect={false}
               keyboardType='email-address'
               returnKeyType="next"
               placeholder='Email'
               placeholderTextColor={colors.white}/>
        <TextInput style = {styles.input}
              returnKeyType="go"
              ref={(input)=> this.passwordInput = input}
              onChangeText = {this.handlePassword}
              placeholder='Password'
              placeholderTextColor={colors.white}
              secureTextEntry/>
      <Button title="Get started" style={styles.bigButton} color={colors.orange} onPress={this.performLogin}/>
      <View style={styles.underButton}>
          <Button title="Sign up" style={styles.smallButton} color={colors.orange} onPress={this.signUp}/>
          <Button title="Quick login" style={styles.smallButton} color={colors.orange} onPress={this.performTestLogin}/>
      </View>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: colors.purple,
    marginBottom: 50,
  },
  bigButton: { 
    marginBottom: 10,
    padding: 10
  },
  smallButton: { 
    width: 40
  },
  underButton: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  input:{
    height: 40,
    backgroundColor: colors.blue,
    marginBottom: 10,
    padding: 10,
    color: '#fff'
  },
  formContainer: {
    width: "90%"
  }
});

export default LoginScreen;
