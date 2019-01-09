import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, ScrollView ,View, Button} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import colors from "../styling/colors";
import tools from "../utils/tools";

const geolib = require('geolib');

class MapComponent extends React.Component {


  render() {
    const points = this.props.points;

    if (this.props.points) {
      const center = geolib.getCenter([points.departure, points.arrival]);
      return (
      <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{...StyleSheet.absoluteFillObject}}
            region={{
            latitude:  parseFloat(center.latitude),
            longitude:  parseFloat(center.longitude),
            latitudeDelta: Math.abs(points.departure.latitude - points.arrival.latitude) + 0.4,
            longitudeDelta: Math.abs(points.departure.longitude - points.arrival.longitude) + 0.4
            }}
          >
          <Marker
            coordinate={points.departure}
          />
          <Marker
            coordinate={points.arrival}
          />
          </ MapView>
      </ View>
      );
    } else return null;

  }
}

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    height: 300,
    justifyContent: 'flex-start',
  }
});

export default MapComponent;
