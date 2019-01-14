import React, {Component} from 'react';
import { StyleSheet, Text, Alert, Modal, View, AsyncStorage,
          ScrollView, Button, TouchableOpacity,
          DatePickerAndroid, TimePickerAndroid } from 'react-native';

import TripDS  from '../datastore/trip-ds';

import RNGooglePlaces from 'react-native-google-places';
import update from 'immutability-helper';

import { Icon, Button as ButtonE } from 'react-native-elements';

import PassengersComponent from '../components/PassengersComponent';
import PriceComponent from '../components/PriceComponent';
import MapComponent from '../components/MapComponent';

import ServerDS  from '../datastore/server';

import colors from "../styling/colors";
import tools from "../utils/tools";

class NewTripModal extends React.Component {

  constructor(props) {
  super(props);
  var date = new Date(); date.setHours(date.getHours()+2
); date.setMinutes(0);
  this.state = {
        departure: null,
        arrival: null,
        passengersCount: 3,
        price: 0,
        date: date,
        isSubmitting: false
    }
  }

  submitTrip() {
    this.setState({isSubmitting: true})
    const s = this.state;
    const flag = s.departure && s.arrival && s.passengersCount
    if (!flag) {
        Alert.alert('Missing information:',
                    `${!s.departure ? 'Departure location' : ''}\
                     ${!s.arrival ? '\nArrival location' : ''}\
                     ${!s.passengersCount ? '\nNumber of passengers' : ''}`
        )
    } else {
       const trip = tools.prepareTrip(s)
       TripDS.createTrip(trip).then((res) => {
              Alert.alert("Trip created successfully!")
              AsyncStorage.setItem('shouldRefreshTrips', 'true').then(() => {
                this.props.toggleShow(true);
              });
        }).catch((err) => {
          Alert.alert("Trip creation error", err.toString())})

    }
    this.setState({isSubmitting: false})

  }

  onRequestClose() {
        Alert.alert(
            'Exit trip creation?',
            'The trip will be lost',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'OK', onPress: () => this.props.toggleShow()},
          ],
            { cancelable: false });
  }

  openPickModal(type) {
    RNGooglePlaces.openPlacePickerModal()
      .then((place) => {
        if(type == 'arrival') this.setState({arrival: place})
        else this.setState({departure: place})
        return ServerDS.getCityName(place.latitude, place.longitude);
      })
      .then((name) => {
        var newS = {}
        if(type == 'arrival') newS = update(this.state, {arrival: {city: {$set: name}}})
        else newS = update(this.state, {departure: {city: {$set: name}}})
        this.setState(newS)
      })
      .catch(error => console.log(error.message));
  }

  async datePickerModal () {
    const {action,year,month,day}  = await DatePickerAndroid.open({date: this.state.date, minDate: (new Date())});
    if (action != DatePickerAndroid.dismissedAction) {
      this.setState({date: new Date(year,month,day,this.state.date.getHours(), this.state.date.getMinutes(),0,0)})
    }
  }

  async timePickerModal () {
    const {action,hour,minute} = await TimePickerAndroid.open({is24Hour: true, hour: this.state.date.getHours(), minute: this.state.date.getMinutes()});
    if (action != TimePickerAndroid.dismissedAction) {
      const o = this.state.date
      const d = new Date(o.getFullYear(), o.getMonth(), o.getDate(), hour, minute,0,0);
      this.setState({date: d})
    }
  }

  passengerCountChange(num) {
    this.setState({passengersCount: num});
  }

  priceChange(num) {
    this.setState({price: num});
  }

  getDepartureDate() {
    const d = this.state.date;
    return `${this.addZero(d.getDate())}/${this.addZero(d.getMonth()+1)}/${d.getFullYear()}`
  }

  getDepartureTime() {
    const d = this.state.date;
    return `${this.addZero(d.getHours())}:${this.addZero(d.getMinutes())}`
  }

  addZero(n) {
    return ((n<10) ? "0" : "") + n.toString();
  }

  getCityText(type) {
    return this.state[type] ? this.state[type].city : (type == 'arrival' ? 'To' : 'From');
  }
  getMeetingText(type) {
    return this.state[type] ? this.shortenName(this.state[type].name) : 'Touch to select';
  }

  shortenName(string) {
    const max = 25
    if (string) {
      return string.length < max ? string : string.slice(0,max)+'...';
    }
    else { return '' };

  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        animationType="slide"
        style={styles.container}
        onRequestClose={this.onRequestClose.bind(this)}
        >
        <ScrollView>
        <View style={styles.backIcon}>
          <Icon
            name="md-arrow-round-back"
            type="ionicon"
            size={55}
            onPress={this.onRequestClose.bind(this)}
            color={colors.orange}/>
        </View>
        <MapComponent points={tools.getDepArrCoordinates(this.state.departure, this.state.arrival)}/>
        <View style={styles.separator}/>
        <View style={styles.places}>
          <TouchableOpacity onPress={() => this.openPickModal('departure')}>
            <Text style={styles.big}>{this.getCityText('departure')}</Text>
            <Text style={styles.small}>{this.getMeetingText('departure')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.openPickModal('arrival')}>
            <Text style={styles.big}>{this.getCityText('arrival')}</Text>
            <Text style={styles.small}>{this.getMeetingText('arrival')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separator}/>
        <PassengersComponent passengerCountChange={this.passengerCountChange.bind(this)}/>
        <View style={styles.separator}/>
        <PriceComponent priceChange={this.priceChange.bind(this)}/>
        <View style={styles.separator}/>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 10}}>
              <TouchableOpacity onPress={this.datePickerModal.bind(this)}>
                <Text style={styles.greyTitle}>{this.getDepartureDate()}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.timePickerModal.bind(this)}>
                <Text style={styles.greyTitle}>{this.getDepartureTime()}</Text>
              </TouchableOpacity>
          </View>
          <View style={styles.separator}/>
          <ButtonE
              containerViewStyle={{ paddingTop: 20}}
              title='Publish trip'
              icon={!this.state.isSubmitting ? {name: 'beenhere'} : null}
              color={colors.purple}
              backgroundColor={colors.orange}
              fontWeight='500'
              loading={this.state.isSubmitting}
              onPress={this.submitTrip.bind(this)}
          />
          </ScrollView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
     flexDirection: 'column',
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
   backIcon: {
     alignSelf: 'flex-start',
     padding: 10
   },
   bigText: {
     fontSize: 25,
     fontWeight: '500',
     color: colors.purple,
     width: '50%'
   },
   pickText: {
     fontSize: 20,
     fontWeight: '400',
     color: colors.grey
   },
   smallTitle: {
     fontSize: 25,
     fontWeight: '500',
     color: colors.purple,
   },
   greyTitle: {
     fontSize: 30,
     fontWeight: '500'
   }
});

export default NewTripModal;
