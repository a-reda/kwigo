import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity,
  Button, AsyncStorage, ActivityIndicator} from 'react-native';

import Dialog from "react-native-dialog";

import UserDS from '../datastore/user-ds';

import { Icon } from 'react-native-elements'

import colors from "../styling/colors";

class UserScreen extends React.Component {

  state = {
    user: {},
    isLoading: true,
    dialogVisible: false,
    dialogType: "",
    input: ''
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

  showDialog = (type) => {
    this.setState({dialogVisible: true, dialogType: type})
  };

  hideDialog = (type) => {
    this.setState({dialogVisible: false})
  }

  handleCancel = () => {
    this.hideDialog();
  };

  handleChange = (type) => {
    var newUser = {};
    newUser[type] = this.state.input;
    this.hideDialog();
    this.setState({isLoading: true})
    UserDS.updateUser(newUser).then((res) => {
      if(res.code=="OK") {
        this.getUserDetails();
      }
    });
  };

  getDialog = (type) => {
      const title = `Modify ${this.state.dialogType}`;
      const placeholder =  this.state.dialogType == "phone_number" ? "Enter new phone number" : "Enter new car model and brand";
      return (
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description>{placeholder}</Dialog.Description>
          <Dialog.Input style={styles.input} onChangeText={(text) => this.setState({input: text})}>
          </Dialog.Input>
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          <Dialog.Button label="Confirm" onPress={() => this.handleChange(type)} />
        </Dialog.Container>
      );
  }

  render() {
    if(this.state.isLoading) {
      return (<ActivityIndicator size="large" color={colors.orange}/>)
    } else {
    const user = this.state.user;
    return (
      <View style={styles.container}>
        {this.getDialog(this.state.dialogType)}
        <Text style={styles.title}>{user.name}'s profile</Text>
        <View  style={styles.separator}/>
        <View style={styles.line}>
          <Icon name="ios-mail" type="ionicon" size={40} color={colors.orange}/>
          <Text style={styles.header}>{user.email}</Text>
        </View>
        <View  style={styles.separator}/>
        <TouchableOpacity style={styles.line} onPress={() => this.showDialog("car")}>
          <Icon name="ios-car" type="ionicon" size={40} color={colors.orange}/>
          <Text style={styles.header}>{user.car}</Text>
        </TouchableOpacity>
        <View  style={styles.separator}/>
        <TouchableOpacity style={styles.line}  onPress={() => this.showDialog("phone_number")}>
          <Icon name="ios-phone-portrait" type="ionicon" size={40} color={colors.orange}/>
          <Text style={styles.header}>{user.phone_number}</Text>
        </TouchableOpacity>
        <View  style={styles.separator}/>
        <View  style={{marginBottom: 50}}/>
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
  },
  input: {
    borderBottomWidth: 3,
    borderBottomColor: colors.orange
  }
});

export default UserScreen;
