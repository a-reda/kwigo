import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, ScrollView ,View, Button} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import colors from "../styling/colors";
import tools from "../utils/tools";

class MapComponent extends React.Component {
  render() {
    const initialPosition = this.props.userPosition ? tools.getCoordinates(this.props.userPosition) : this.props.initialPosition;
    return (
    <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{...StyleSheet.absoluteFillObject}}
          region={{
          latitude:  initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.0300,
          longitudeDelta: 0.0300
          }}
        >
          { this.props.userPosition && // Marker for live location
              <Marker
                coordinate={tools.getCoordinates(this.props.userPosition)}
                image={require('../assets/pinUser.png')}
                title="User"
              />
          }
        </ MapView>
    </ View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    height: 800,
    justifyContent: 'flex-start',
  }
});

export default MapComponent;
