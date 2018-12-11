import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, ScrollView, Button} from 'react-native';

import SearchComponent from '../components/SearchComponent';
import TripList from '../components/TripList';

import colors from "../styling/colors";

class TripsScreen extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
          <TripList trips={mocktrips}/>
      </ ScrollView>
    );
  }
}

// Dev purposes
const mocktrips = getMockTrips();
function getMockTrips() {
  let mocktrips = [];
  for (let i = 0; i<11; i++) {
      mocktrips.push({origin: "Milano", destination:"Padova", depTime:"10:00"});
  }
  return mocktrips
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: colors.white,
  },
  logo: {
    color: colors.purple,
    fontSize: 70,
    textAlign: 'center',
    margin: 10,
  }
});

export default TripsScreen;
