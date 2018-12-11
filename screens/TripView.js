import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, ScrollView ,View, Button} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

import SearchComponent from '../components/SearchComponent';

import colors from "../styling/colors";

class TripView extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{...StyleSheet.absoluteFillObject}}
          region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  logo: {
    color: colors.purple,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

export default TripView;
