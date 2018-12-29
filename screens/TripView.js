import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, ScrollView ,View, Button} from 'react-native';

import MapComponent from '../components/MapComponent';
import CheckinComponent from '../components/CheckinComponent';

import requestLocationPermission from '../utils/permission';

import colors from "../styling/colors";

class TripView extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          userPosition: null,
          error: null
      };
  }

  // Request Location Permission
  async componentWillMount() {
      await requestLocationPermission() // which always returns "You can use the camera" even if I disable camera permission access on my device
  }

  // Update UserLocation
  componentDidMount() {
      this.watchId = navigator.geolocation.watchPosition(
        (position) => {
          this.setState({
            userPosition: position,
            error: null
          });
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
      );
  }

  componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    // const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <MapComponent
          initialPosition={initialPosition}
          userPosition={this.state.userPosition}
        />
        <CheckinComponent

        />
      </View>
    );
  }
}

const initialPosition = {latitude: 45.4877408,longitude: 9.2349859}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default TripView;
