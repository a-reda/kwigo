import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, ScrollView ,View, Button} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import colors from "../styling/colors";

class MapComponent extends React.Component {
  render() {
    const initialPosition = this.props.initialPosition;
    return (
    <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{...StyleSheet.absoluteFillObject}}
          region={{
          latitude:  initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
          }}
        >
          <Marker
            coordinate={initialPosition}
            title="Reda"
            description="GOGO"
          />
        </ MapView>
    </ View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    height: 400,
    // width: 400,
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

export default MapComponent;
