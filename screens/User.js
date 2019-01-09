import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View, Button, AsyncStorage} from 'react-native';

import colors from "../styling/colors";

class UserScreen extends React.Component {

  state = {
    user: {}
  }

  logOut = () => { 
      AsyncStorage.removeItem('userToken');
      this.props.navigation.navigate('AuthLoading');
  }
  componentDidMount() {
    AsyncStorage.getItem('userId').then((id) => this.setState({user: {id: id}}))
  }



  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.title}>User management</Text>
        <Text style={styles.title}>{this.state.user.id}</Text>
        <Button title="Sign Out" color={colors.orange}  onPress={this.logOut} />
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
  ttle: {
    color: colors.purple,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

export default UserScreen;
