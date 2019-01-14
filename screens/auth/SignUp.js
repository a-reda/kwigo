import React from 'react'
import {
  Alert,
  Text,
  View, ScrollView,
  Button,
  TextInput,
  StyleSheet
} from 'react-native'

import { FormLabel, FormInput, FormValidationMessage, Icon } from 'react-native-elements'

import UserDS  from '../../datastore/user-ds';

import colors from "../../styling/colors";

export default class SignUpScreen extends React.Component {
  state = {
    name: '', email: '', password: '', car: '', phone_number: '',
    isNameVld: true, isEmailVld: true, isPasswordVld: true, isPhoneVld: true, isEverythingValid: false,
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
    const s = this.state
    const isValid = s.isNameVld && s.isEmailVld && s.isPasswordVld && s.isPhoneVld;
    this.setState({isEverythingValid: isValid})
  }
  signUp = async () => {
    if(this.state.isEverythingValid) {
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
    })}
    else { Alert.alert('Please fix the missing fields') }
  }

  validateName = () => {this.setState({isNameVld: (this.state.name != '')})};
  validateEmail = () => {
    const emailRegex = /[^@]+@[^\.]+\..+/;
    this.setState({isEmailVld: emailRegex.test(this.state.email)});
  };
  validatePassword = () => {this.setState({isPasswordVld: (this.state.password.length >= 8)})};
  validatePhone = () => {
    const phoneRegex = /([(+]*[0-9]+[()+. -]*)/;
    this.setState({isPhoneVld: phoneRegex.test(this.state.phone_number)});
  }

  render() {
    return (
     <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10}}>
         <Icon
           name="md-arrow-round-back"
           type="ionicon"
           size={55}
           onPress={() => this.props.navigation.navigate('AuthLoading')}
           color={colors.orange}/>
       </View>
      <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>Join our community!</Text>
        <View style={styles.form}>
          <FormLabel>Name</FormLabel>
          <FormInput
                inputStyle={styles.input}
                onChangeText={val => this.onChangeText('name', val)}
                autoCapitalize="words"
                returnKeyType="next"
                placeholderTextColor={colors.grey}
                onSubmitEditing={this.validateName}
          />
          {this.state.isNameVld  ? null : <FormValidationMessage>Name cannot be empty</FormValidationMessage>}
          <FormLabel>Email</FormLabel>
          <FormInput
                inputStyle={styles.input}
                onChangeText={val => this.onChangeText('email', val)}
                keyboardType='email-address'
                autoCapitalize="none"
                returnKeyType="next"
                placeholderTextColor={colors.grey}
                onSubmitEditing={this.validateEmail}
          />
          {this.state.isEmailVld  ? null : <FormValidationMessage>Invalid email</FormValidationMessage>}
          <FormLabel>Password</FormLabel>
          <FormInput
                inputStyle={styles.input}
                onChangeText={val => this.onChangeText('password', val)}
                secureTextEntry={true}
                autoCapitalize="none"
                returnKeyType="next"
                placeholderTextColor={colors.grey}
                onSubmitEditing={this.validatePassword}
          />
          {this.state.isPasswordVld ? null : <FormValidationMessage>Password should be more than 8 characters</FormValidationMessage>}
          <FormLabel>Phone number</FormLabel>
          <FormInput
                inputStyle={styles.input}
                onChangeText={val => this.onChangeText('phone_number', val)}
                secureTextEntry={true}
                autoCapitalize="none"
                keyboardType='phone-pad'
                returnKeyType="next"
                placeholderTextColor={colors.grey}
                onSubmitEditing={this.validatePhone}
          />
          {this.state.isPhoneVld  ? null : <FormValidationMessage>Invalid phone number</FormValidationMessage>}
          <FormLabel>Car</FormLabel>
          <FormInput
                inputStyle={styles.input}
                onChangeText={val => this.onChangeText('car', val)}
                placeholder='Optional'
                secureTextEntry={true}
                autoCapitalize="words"
                returnKeyType="next"
                placeholderTextColor={'#C8C8C8'}
          />
        </View>
        <Button
          title='Sign Up'
          color={colors.orange}
          onPress={this.signUp}
        />
      </View>
      </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text:{
    color: colors.orange,
    fontSize: 30,
    fontWeight: '500',
    padding: 20
  },
  form:{
    width: '100%'
  },
  input: {
    fontSize: 20,
    borderBottomWidth: 3,
    borderBottomColor: colors.orange,
    color: colors.blue
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white
  }
})
