import React from 'react'
import {
  Alert,
  Text,
  View,
  Button,
  TextInput,
  StyleSheet
} from 'react-native'

import UserDS  from '../../datastore/user-ds';

import colors from "../../styling/colors";

export default class SignUpScreen extends React.Component {
  state = {
    name: '', email: '', password: '', car: '', phone_number: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  signUp = async () => {
    console.log(this.state)
    UserDS.createUser(this.state).then((res)=> {
      switch (res.code) {
          case 'NOK':
              Alert.alert('Email already exists');
              break;
          case 'OK':
              Alert.alert('Welcome to Kwigo! \n Go ahead and login');
              this.props.navigation.navigate('AuthLoading');
              break;
          default:
              Alert.alert('Unexpected response ... ');
              this.props.navigation.navigate('AuthLoading');
              break;
            }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Join our community!</Text>
        <TextInput
          style={styles.input}
          placeholder='Name'
          autoCapitalize="words"
          returnKeyType="next"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('name', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          keyboardType='email-address'
          returnKeyType="next"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('email', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          returnKeyType="next"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('password', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Phone number'
          autoCapitalize="none"
          keyboardType='phone-pad'
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('phone_number', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Car'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('car', val)}
        />
        <Button
          title='Sign Up'
          color={colors.orange}
          onPress={this.signUp}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text:{
    color: colors.orange,
    fontSize: 30,
    fontWeight: '500',
    paddingBottom: 60,
    backgroundColor: colors.white
  },
  input: {
    backgroundColor: colors.blue,
    margin: 10,
    padding: 10,
    color: colors.white,
    height: 40,
    width: "90%"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
