import React, {Component} from 'react';
import { StyleSheet, Text, Alert, Modal, View, Button, TouchableOpacity} from 'react-native';

import RNGooglePlaces from 'react-native-google-places';

import { Icon } from 'react-native-elements';

import PassengersComponent from './PassengersComponent';

import colors from "../styling/colors";

class NewTripModal extends React.Component {

  state = {
      departure: null,
      arrival: null,
      passengersCount: null
  }

  openPickModal(type) {
    RNGooglePlaces.openPlacePickerModal()
      .then((place) => {
        if(type == 'arrival') this.setState({arrival: place})
        else this.setState({departure: place})
        console.log(this.state)
      })
      .catch(error => console.log(error.message));
  }

  passengerCountChange(num) {
    this.setState({passengersCount: num});
  }

  getCityText(type) {

    return this.state[type] ? this.state[type].name : 'Pick ...'

  }


  render() {
    return (
      <Modal
        visible={this.props.visible}
        animationType="slide"
        style={styles.container}
        onRequestClose={this.props.toggleShow}
        >
        <View style={styles.backIcon}>
          <Icon
            name="md-arrow-round-back"
            type="ionicon"
            size={55}
            onPress={this.props.toggleShow}
            color={colors.orange}/>
        </View>
          <View style={styles.placePicker}>
            <Text style ={styles.bigText}>Departure {this.state.passengersCount}</Text>
            <TouchableOpacity onPress={() => this.openPickModal('departure')}>
            <Text style={styles.pickText}>{this.getCityText('departure')}</Text>
            </TouchableOpacity>
            <Text style ={styles.bigText}>Arrival</Text>
            <TouchableOpacity onPress={() => this.openPickModal('arrival')}>
            <Text style={styles.pickText}>{this.getCityText('arrival')}</Text>
            </TouchableOpacity>
          </View>
          <PassengersComponent passengerCountChange={this.passengerCountChange.bind(this)}/>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
     flexDirection: 'column'
   },
   backIcon: {
     alignSelf: 'flex-start',
     padding: 10
   },
   bigText: {
     fontSize: 30,
     fontWeight: '400',
     color: colors.purple
   },
   placePicker: {
     justifyContent: 'flex-start',
     alignItems: 'flex-start',
     padding: 10
   },
   pickText: {
     fontSize: 20,
     fontWeight: '400',
     color: colors.grey
   }
});

export default NewTripModal;
