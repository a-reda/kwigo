import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, ScrollView ,View, Button, Image, PixelRatio} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import colors from "../styling/colors";
import {dots} from "../styling/colors";
import tools from "../utils/tools";

const geolib = require('geolib');

class MapLiveComponent extends React.Component {

  pixelRatio = PixelRatio.get();
  anchor = {x: 0.5, y:0.5};

  render() {

    const user = this.props.user;
    const markers =  this.props.positions.map((e,i) => {
    return (<Marker anchor={this.anchor} key={i} coordinate={e}>
                <Image
                    source={dots[e.color]}
                    style={{height: 8*this.pixelRatio, width: 8*this.pixelRatio}}
                />
              </Marker>)
    });

    if (this.props.user && this.props.departure && this.props.arrival) {
      return (
      <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{...StyleSheet.absoluteFillObject}}
            initialRegion={{
              latitude:  parseFloat(this.props.departure.latitude),
              longitude:  parseFloat(this.props.departure.longitude),
              latitudeDelta: 0.03,
              longitudeDelta: 0.03
              }}
          >
          <Marker anchor={this.anchor} key="departure" coordinate={this.props.departure}>
          <Image
              source={require('../assets/departure.png')}
              style={{height: 15*this.pixelRatio, width: 15*this.pixelRatio}}
          />
          </Marker>
          <Marker anchor={this.anchor} key="arrival" coordinate={this.props.arrival}>
          <Image
              source={require('../assets/departure.png')}
              style={{height: 15*this.pixelRatio, width: 15*this.pixelRatio}}
          />
          </Marker>
          { markers }
          </ MapView>
      </ View>
      );
    } else return null;

  }
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    justifyContent: 'flex-start',
  }
});

export default MapLiveComponent;
