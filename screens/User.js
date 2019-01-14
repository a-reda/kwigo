import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity,
  Button, AsyncStorage, ActivityIndicator} from 'react-native';

import UserDS from '../datastore/user-ds';

import { Icon } from 'react-native-elements'

import colors from "../styling/colors";

class UserScreen extends React.Component {

  state = {
    user: {},
    isLoading: true
  }

  logOut = () => { 
      AsyncStorage.removeItem('userToken');
      this.props.navigation.navigate('AuthLoading');
  }

  componentDidMount() {
    this.getUserDetails()
  }

  getUserDetails = () => {
    this.setState({isLoading: true});
    AsyncStorage.getItem('userId').then((id) => {
        UserDS.getUser(id).then((user) => {
            this.setState({user: user, isLoading: false});
        });
    });
  }

  render() {
    if(this.state.isLoading) {
      return (<ActivityIndicator size="large" color={colors.orange}/>)
    } else {
    const user = this.state.user;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{user.name}'s profile</Text>
        <View  style={styles.separator}/>
        <View style={styles.line}>
          <Icon name="ios-mail" type="ionicon" size={40} color={colors.orange}/>
          <Text style={styles.header}>{user.email}</Text>
        </View>
        <View  style={styles.separator}/>
        <TouchableOpacity style={styles.line}>
          <Icon name="ios-car" type="ionicon" size={40} color={colors.orange}/>
          <Text style={styles.header}>{user.car}</Text>
        </TouchableOpacity>
        <View  style={styles.separator}/>
        <TouchableOpacity style={styles.line}>
          <Icon name="ios-phone-portrait" type="ionicon" size={40} color={colors.orange}/>
          <Text style={styles.header}>{user.phone_number}</Text>
        </TouchableOpacity>
        <View  style={styles.separator}/>
        <Button title="Sign Out" color={colors.orange}  onPress={this.logOut} />
      </View>
    );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  title: {
    color: colors.purple,
    fontSize: 40,
    textAlign: 'center',
    margin: 70,
  },
  separator:{
    borderBottomColor: colors.lightgrey,
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    width: '100%'
  },
  line: {
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    padding: 10,
    width: '80%'
  },
  header:{ 
    fontSize: 20,
    fontWeight: '200',
    alignSelf:'center'
  }
});

export default UserScreen;
