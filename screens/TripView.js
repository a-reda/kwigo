import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, ScrollView, Button} from 'react-native';
import MapView from 'react-native-maps';

import SearchComponent from '../components/SearchComponent';

import colors from "../styling/colors";

class TripView extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.logo}>Kwigo</Text>
        <MapView
          initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        />
        <SearchComponent />
      </ScrollView>
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

export default TripView;
