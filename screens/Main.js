import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View, Button} from 'react-native';

import SearchComponent from '../components/SearchComponent';

import colors from "../styling/colors";

class MainScreen extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Kwigo</Text>
        <SearchComponent />
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
  logo: {
    color: colors.purple,
    fontSize: 70,
    textAlign: 'center',
    margin: 10,
  }
});

export default MainScreen;
