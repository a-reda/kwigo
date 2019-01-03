import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from 'react-native-elements';

import SearchComponent from '../components/SearchComponent';

import colors from "../styling/colors";

class MainScreen extends React.Component {

  _createNewTrip = () => {
    this.props.navigation.navigate('newTrip')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Kwigo</Text>
        <SearchComponent />
        <View style={styles.buttonContainer}>
          <Button
              icon={{name:'add'}}
              backgroundColor={colors.orange}
              title='New'
              onPress={this._createNewTrip}
          />
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
  logo: {
    color: colors.purple,
    fontSize: 70,
    textAlign: 'center',
    margin: 10,
  }
});

export default MainScreen;
