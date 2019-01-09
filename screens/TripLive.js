import React, {
  Component
} from 'react';
import {
  StyleSheet, ActivityIndicator,
  Text, AsyncStorage,
  TextInput,
  ScrollView,
  View,
  Button
} from 'react-native';

import { Icon } from 'react-native-elements';

import MapLiveComponent from '../components/MapLiveComponent';
import CheckinComponent from '../components/CheckinComponent';

import requestLocationPermission from '../utils/permission';

import TripDS  from '../datastore/trip-ds';

import colors from "../styling/colors";
import tools from "../utils/tools";

class TripLive extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userPosition: null,
      error: null,
      nextTrip: {},
      nextTripActive:false,
      locationPermission: false,
      positions: []
    };
  }

  async askLocationPermission() {
    const permission = await requestLocationPermission();
    this.setState({
      locationPermission: permission
    }, this.setWatcher);
  }

  setWatcher() {
    if (this.state.locationPermission) {
      navigator.geolocation.getCurrentPosition((position) => this.updateUserPosition(position))
      this.watchId = navigator.geolocation.watchPosition(
        (position) => {
          console.log(position)
          this.updateUserPosition(position)
        },
        (error) => this.setState({
          error: error.message
        }), {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
          distanceFilter: 10
        },
      );
      console.log("watcher set")
    }
  }

  getPositions = () => {
    TripDS.getPositions(this.state.nextTrip.id).then((pos) => {
      console.log(pos.length)
      this.setState({positions: pos})
    })
  }

  async componentDidMount() {
    this.askLocationPermission()
    var userId = await AsyncStorage.getItem('userId').then((i) => this.setState({userId: i}))
    // TODO:  This can go to a util function
    var trips = await Promise.all([TripDS.registeredTrips(), TripDS.getMyTrips()])
            .then((trips) => {
              return  trips[0].concat(trips[1]);
            });
    trips.sort((a,b) => (a.date-b.date));
    if(trips.length) this.setState({nextTrip: trips[0]}, () => {
      this.getPositions();
      setInterval(this.getPositions, 10000)
    });
  }

  updateUserPosition (location) {
    const l = tools.getCoordinates(location)      // Format object
    this.setState({userPosition: l })            // Set local state
    TripDS.setPosition(l.latitude, l.longitude);  // Set server state
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  getLocationObject(lat,lon) {
    return {latitude: lat, longitude: lon}
  }

   getDistance = (userId, dep) => { // Clumsy but working
     if(this.state.userId) {
       var position = {latitude: 0, longitude: 0};
       console.log(userId, this.state.userId)
       if(this.state.userId == userId) {
         position = this.state.userPosition;
       } else {
         for(i in this.state.positions){
            if (this.state.positions[i].userId == userId) position = this.state.positions[i];
         }
       }
       return geolib.getDistance(dep, position)/1000;
     } else {console.log('notfound...?'); return 0;};
  }

  render() {
    const trip = this.state.nextTrip;
    console.log(this.state)
    return (
      <View style = {styles.container}>
      <Text>{this.state.locationPermission ? 'Location ON' : 'Location OFF'} {JSON.stringify(this.state.userPosition)}</Text>
      { trip.date ?
      <View>
          { (this.state.locationPermission && this.state.userPosition) ?
          <MapLiveComponent initialPosition={this.getLocationObject(trip.departure.latitude,trip.departure.longitude)}
                            departure={this.getLocationObject(trip.departure.latitude,trip.departure.longitude)}
                            arrival={this.getLocationObject(trip.arrival.latitude,trip.arrival.longitude)}
                            positions={this.state.positions.map((e) => this.getLocationObject(e.latitude, e.longitude))}
                            user={this.state.userPosition} /> : null
          }
          <View style={styles.places}>
            <View style={styles.arrival}>
              <Text style={styles.big}>{trip.departure.city}</Text>
              <Text style={styles.small}>{trip.departure.name}</Text>
            </View>
            <View style={styles.destination}>
              <Text style={styles.big}>{trip.arrival.city}</Text>
              <Text style={styles.small}>{trip.arrival.name}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
          <View style={styles.passenger}>
            <View style={styles.passengerSingle}>
              <Icon name="steering" type="material-community" size={40} color={colors.orange}/>
              <Text style={styles.mediumD}>{trip.driver.name}</Text>
            </View>
            <Text style={styles.distance}>{1} km</Text>
          </View>
          {this.state.nextTrip.passengers.map((e,i) => (
            <View style={styles.passenger} key={i}>
              <View style={styles.passengerSingle}>
                <Icon name="user" type="feather" size={40} color={colors.blue}/>
                <Text style={styles.mediumD}>{e.name}</Text>
              </View>
              {trip.departure ? <Text style={styles.distance}>{this.getDistance(e.id, trip.departure)} km</Text> : null }
            </View>)
          )}
          <View style={styles.separator}/>
          <View style={styles.info}>
              <View style={{justifyContent: 'center', width: '50%'}}>
                <Icon name="ios-car" type="ionicon" size={40} color={colors.orange}/>
                <Text style={styles.medium}>{trip.driver.car}</Text>
              </View>
              <View style={{justifyContent: 'center', width: '50%'}}>
                <Icon name="euro" type="font-awesome" size={40} color={colors.orange}/>
                <Text style={styles.medium}>{trip.price} €</Text>
              </View>
          </View>
          <View  style={styles.separator}/>
      </View>
      : <ActivityIndicator size="large" color={colors.orange}/> }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
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
  mediumD: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: '500',
    marginLeft: 10
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  passengerSingle:{
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  passenger:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10
  },
  distance: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: colors.blue,
    paddingRight: 10
  }
});

export default TripLive;
