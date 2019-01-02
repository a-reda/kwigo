import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View, Button, AsyncStorage} from 'react-native';

import colors from "../styling/colors";

class UserScreen extends React.Component {

  logOut = () => { 
      AsyncStorage.removeItem('userToken');
      this.props.navigation.navigate('AuthLoading');
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.title}>User management</Text>
        <Button title="Log Out" color={colors.orange}  onPress={this.logOut} />
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
