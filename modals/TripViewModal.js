import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, ScrollView ,View, Button, Modal, ActivityIndicator} from 'react-native';

import { Icon } from 'react-native-elements'

import MapComponent from '../components/MapComponent';
import OccupanceComponent from '../components/OccupancyComponent';

import TripDS from '../datastore/trip-ds'

import requestLocationPermission from '../utils/permission';

import colors from "../styling/colors";
import tools from "../utils/tools";

class TripView extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          userPosition: null,
          error: null,
          trip: {}
      };
  }

  componentDidMount () {
      console.log("did mount")
      TripDS.findTripById(this.props.tripId).then((t) => this.setState({trip: t}))
  }

  render() {
    const trip = this.state.trip;
    const departure = trip.departure ? trip.departure : {};
    const arrival = trip.arrival ? trip.arrival : {};
    console.log(departure);
    return (
      <Modal visible={this.props.visible}
              animationType="slide"
              style={styles.container}
              onRequestClose={this.props.onRequestClose}>
          <View>
           <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10}}>
              <Icon
                name="md-arrow-round-back"
                type="ionicon"
                size={55}
                onPress={() => this.props.onRequestClose(false)}
                color={colors.orange}/>
                <Text style={styles.price}>{trip.price} {trip.price ? € : null}</Text>
            </View>
              { trip.date ?
              <View>
                  <MapComponent points={tools.getDepArrCoordinates(departure, arrival)}/>
                  <View style={styles.places}>
                    <View style={styles.arrival}>
                      <Text style={styles.big}>{departure.city}</Text>
                      <Text style={styles.small}>{departure.name}</Text>
                    </View>
                    <View style={styles.destination}>
                      <Text style={styles.big}>{arrival.city}</Text>
                      <Text style={styles.small}>{arrival.name}</Text>
                    </View>
                  </View>
                  <OccupanceComponent available={5} busy={3}/>
              </View>
              : <ActivityIndicator size="large" color={colors.orange}/> }
          </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  places: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between'
  },
  big: {
    fontSize: 25,
    fontWeight: '500',
    color: colors.blue
  },
  small: {
    fontSize: 15,
    fontWeight: '200'
  },
  passengers: {
    padding: 10,
    fontSize: 20,
    fontWeight: '200'
  },
  price: {
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: '500',
    color: colors.blue,
    width: '12%'
  }
});

export default TripView;
