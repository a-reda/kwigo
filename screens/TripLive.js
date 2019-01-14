import React, {
  Component
} from 'react';
import {
  StyleSheet, ActivityIndicator,
  Text, AsyncStorage,
  TextInput, Switch,
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
      liveEnabled: true,
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
    }
  }

  getPositions = () => {
    TripDS.getPositions(this.state.nextTrip.id).then((pos) => {
      pos.forEach((e,i) => e.color = colors.markers[i])
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
      this.interval = setInterval(this.getPositions, 5000);
    });
  }

  updateUserPosition (location) {
    const l = tools.getCoordinates(location)      // Format object
    this.setState({userPosition: l })            // Set local state
    TripDS.setPosition(l.latitude, l.longitude);  // Set server state
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
    clearInterval(this.interval)
  }

  getLocationObject(lat,lon) {
    return {latitude: lat, longitude: lon}
  }

  findColor(userId) {
    var color = null;
    this.state.positions.forEach((e) => {if(userId == e.userId) color = e.color});
    return color;
  }

   getDistance = (userId, dep) => { // Clumsy but working
     if(this.state.userId) {
       var position = null;
       if(this.state.userId == userId) {
         position = this.state.userPosition;
       } else {
         for(i in this.state.positions){
            if (this.state.positions[i].userId == userId) position = this.state.positions[i];
         }
       }
       if (position) return (geolib.getDistance(dep, position)/1000).toFixed(1) + ' km';
       else return '--';
     } else {console.log('notfound...?'); return '--';};
  }

  activateLive = () => {
    // Stop and start this
    if(this.state.liveEnabled) {
      this.componentWillUnmount()
    } else {
      this.componentDidMount();
    }
    this.setState({liveEnabled: !this.state.liveEnabled})
  }

  getAlternativePage = () => {
    const trip = this.state.nextTrip;

    if(!trip.date) {
      return (<ActivityIndicator size="large" color={colors.orange}/>);
    } else if (trip.date && !this.state.liveEnabled) {
      return (
        <View style={{justifyContent: 'center', alignContent: 'center', flexGrow: 1}}>
        <Text style={styles.instructions}>Your next trip</Text>
        <View style={styles.separator}/>
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
        <View>
            <Text style={styles.mediumOrange}>{tools.getDepartureDate(trip.date)}</Text>
            <Text style={styles.mediumOrange}>{tools.getDepartureTime(trip.date)}</Text>
        </View>
        <View style={styles.separator}/>
        <View style={{justifyContent: 'center', alignContent: 'center', padding:10}}>
          <Text style={styles.instructions}>Enable live location to see the positions of other users</Text>
        </View>
        </View>
      );
    } else if (!trip.date) {
      <Text>No trip available, come back when you register to a trip</Text>
    }


  }

  render() {
    const trip = this.state.nextTrip;
    console.log(this.state)
    return (
      <View style = {styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', height: 50}}>
             <Text style={styles.small}>{this.state.liveEnabled ? 'Disable' : 'Enable'} live location</Text>
             <Switch style={styles.switch}
             value={this.state.liveEnabled}
             thumbColor={colors.orange} ios_backgroundColor={colors.orange}
             onValueChange={this.activateLive}/>
         </View>
      { (trip.date && this.state.liveEnabled) ?
      <ScrollView>
          { (this.state.locationPermission && this.state.userPosition) ?
          <MapLiveComponent initialPosition={this.getLocationObject(trip.departure.latitude,trip.departure.longitude)}
                            departure={this.getLocationObject(trip.departure.latitude,trip.departure.longitude)}
                            arrival={this.getLocationObject(trip.arrival.latitude,trip.arrival.longitude)}
                            positions={this.state.positions}
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
              <Icon name="steering" type="material-community" size={40} color={this.findColor(trip.driver.id)}/>
              <Text style={styles.mediumD}>{trip.driver.name}</Text>
            </View>
            <Text style={styles.distance}>{this.getDistance(trip.driver.id, trip.departure)}</Text>
          </View>
          {this.state.nextTrip.passengers.map((e,i) => (
            <View style={styles.passenger} key={i}>
              <View style={styles.passengerSingle}>
                <Icon name="user" type="feather" size={40} color={this.findColor(e.id)}/>
                <Text style={styles.mediumD}>{e.name}</Text>
              </View>
              <Text style={styles.distance}>{this.getDistance(e.id, trip.departure)}</Text>
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
      </ScrollView>
      : this.getAlternativePage() }
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
    justifyContent: 'space-around'
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
  mediumOrange: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: '500',
    color: colors.orange,
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
  },
  switch: {
    paddingLeft: 10
  },
  instructions: {
    fontSize: 20,
    fontWeight: '400',
    alignSelf: 'center'
  }
});

export default TripLive;
