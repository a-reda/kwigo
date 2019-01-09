import React, {Component} from 'react';
import { Alert, StyleSheet, Text, TextInput, AsyncStorage,
         ScrollView ,View, Button, Modal, ActivityIndicator} from 'react-native';

import { Icon, Button as ButtonE } from 'react-native-elements'

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
      AsyncStorage.getItem('userId').then((id) => this.setState({userId: id}));
      TripDS.findTripById(this.props.tripId).then((t) => {
        this.setState({trip: t});
      }).catch((err) => Alert.alert('Couldn\'t get trip', err.toString(), [{text: 'Ok', onPress: () => this.props.onRequestClose()}]))
  }

  registerTrip = () => {
      TripDS.registerTrip(this.props.tripId).then((res) => {
        if(res.code == "OK") {
          this.componentDidMount()
          console.log("registered")
        } else {
          Alert.alert('Couldn\'t register you for the trip', res.text);
        }
      })
  }

  leaveTrip = () => {
      TripDS.leaveTrip(this.props.tripId).then((res) => {
        if(res.code == "OK") {
          this.componentDidMount()
          console.log("left")
        } else {
          Alert.alert('Couldn\'t register you for the trip', res.text);
        }
      })
  }

  deleteTrip = () => {
      TripDS.deleteTrip(this.props.tripId).then((res) => {
        console.log(res)
        if(res.code == "OK") {
          this.props.onRequestClose()
          Alert.alert('Trip deleted', 'Sorry to see you canceling the trip');
          console.log("deleted")
        } else {
          Alert.alert('Couldn\'t delete the trip', res.text);
        }
      })
  }

  isMine() {
    return this.state.userId == this.state.trip.driver.id
  }

  isMeRegistered () {
    console.log(this.state.trip.passengers)
    let ids = this.state.trip.passengers.map(p => p.id);
    return ids.includes(this.state.userId);
  }

  render() {
    const trip = this.state.trip;
    const departure = trip.departure ? trip.departure : {};
    const arrival = trip.arrival ? trip.arrival : {};
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
                <Text style={styles.price}>{trip.price} {trip.date ? '€' : null}</Text>
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
                  <View  style={styles.separator}/>
                  <OccupanceComponent available={trip.passengersCount} busy={trip.passengers.length}/>
                  <View  style={styles.separator}/>
                  <View style={styles.info}>
                      <View style={{justifyContent: 'center', width: '50%'}}>
                        <Icon name="ios-car" type="ionicon" size={40} color={colors.orange}/>
                        <Text style={styles.medium}>{trip.driver.car}</Text>
                      </View>
                      <View style={{justifyContent: 'center', width: '50%'}}>
                        <Icon name="steering" type="material-community" size={40} color={colors.orange}/>
                        <Text style={styles.medium}>{trip.driver.name}</Text>
                      </View>
                  </View>
                  <View  style={styles.separator}/>
                  {this.props.mode == 'JOIN' ?
                  <ButtonE fontWeight='400' fontSize={20} backgroundColor={colors.orange} title='Join this trip'
                           onPress={this.registerTrip} icon={{name: 'check', size:30}}/> : null }
                  { (this.props.mode == 'VIEW' && this.isMine()) ?
                  <ButtonE fontWeight='400' fontSize={20} backgroundColor={colors.orange} title='Delete this trip'
                           onPress={this.deleteTrip} icon={{name: 'check', size:30}}/> : null }
                  { (this.props.mode == 'VIEW' && this.isMeRegistered()) ?
                  <ButtonE fontWeight='400' fontSize={20} backgroundColor={colors.orange} title='Leave this trip'
                           onPress={this.leaveTrip} icon={{name: 'check', size:30}}/> : null }
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
  separator:{
    borderBottomColor: colors.lightgrey,
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10
  },
  places: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between'
  },
  big: {
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: '500',
    color: colors.blue
  },
  small: {
    fontSize: 15,
    fontWeight: '200'
  },
  medium: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: '500'
  },
  price: {
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: '500',
    color: colors.blue,
    width: '16%'
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

export default TripView;
