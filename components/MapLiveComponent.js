import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, ScrollView ,View, Button} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import colors from "../styling/colors";
import tools from "../utils/tools";

const geolib = require('geolib');

class MapLiveComponent extends React.Component {


  render() {
    const user = this.props.user;
    console.log(this.props.positions)
    console.log(user)

    const markers =  this.props.positions.map((e,i) => {
      console.log(e)
      return (<Marker key={i} pinColor={colors.orange} coordinate={e}/>)
    });

    if (this.props.user && this.props.departure && this.props.arrival) {
      return (
      <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{...StyleSheet.absoluteFillObject}}
            region={{
            latitude:  parseFloat(this.props.departure.latitude),
            longitude:  parseFloat(this.props.departure.longitude),
            latitudeDelta: 0.03,
            longitudeDelta: 0.03
            }}
          >
          <Marker
            coordinate={user}
            pinColor={colors.blue}
          />
          <Marker key="departure"
            coordinate={this.props.departure}
            image={require('../assets/departure.png')}
          />
          <Marker
            key="arrival"
            coordinate={this.props.arrival}
            image={require('../assets/departure.png')}
          />
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
