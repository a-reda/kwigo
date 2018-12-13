import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, ScrollView ,View, Button} from 'react-native';

import MapComponent from '../components/MapComponent';

import colors from "../styling/colors";

class TripView extends React.Component {

  render() {
    // const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <MapComponent
          initialPosition={initialPosition}
        />
      </View>
    );
  }
}

const initialPosition = {lat: 45.4777408,lon: 9.2349859}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    color: colors.purple,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

export default TripView;
