import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Alert} from 'react-native';

import colors from "../styling/colors";

class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Kwigo</Text>
        <Text style={styles.instructions}>We will get you anywhere</Text>
        <Button title="Get started" color={colors.orange} onPress={()=>this.props.navigation.navigate('Main')}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
    marginBottom: 5,
  },
});

export default LoginScreen;
