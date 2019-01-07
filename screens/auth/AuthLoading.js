import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text
} from 'react-native';

import AuthenticationDS  from '../../datastore/authentication';

import colors from "../../styling/colors";

class AuthLoadingScreen extends React.Component {

  state = {text: ''}

  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    if(userToken) { // If there is a stored user token, validate it with server
      var val = null
      while(!val) {
        val = await AuthenticationDS.validateToken(userToken);
        if (!val) this.setState({text: 'We are having problems reaching the server ...'});
      }
      // User should be stored here and state updated
      this.props.navigation.navigate(val ? 'App' : 'Login');
    } else {
      this.props.navigation.navigate('Login');
    }
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.orange}/>
        <StatusBar barStyle="default" />
        <Text style={styles.errorText}>{this.state.text ? this.state.text : ''}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center'
  },
  errorText: {
    padding: 10,
    fontSize: 15,
    alignSelf: 'center'
  }
});

export default AuthLoadingScreen;
