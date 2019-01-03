import React, {Component} from 'react';
import {  StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import RNGooglePlaces from 'react-native-google-places';

import colors from "../../styling/colors";

class NewTripDepartureScreen extends React.Component {
  openSearchModal() {
  RNGooglePlaces.openPlacePickerModal()
    .then((place) => {
    console.log(place);
    // place represents user's selection from the
    // suggestions and it is a simplified Google Place object.
    })
    .catch(error => console.log(error.message));  // error is a Javascript Error object
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Departure place</Text>
        <TouchableOpacity
            style={styles.button}
            onPress={() => this.openSearchModal()}
        >
        <Text>Open Place Picker</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
  }
});

export default NewTripDepartureScreen;
