import React, {Component} from 'react';
import { StyleSheet, Text, Alert, Modal, View,  ScrollView, Button, TouchableOpacity} from 'react-native';

import RNGooglePlaces from 'react-native-google-places';

import { Icon } from 'react-native-elements';

import PassengersComponent from './PassengersComponent';
import PriceComponent from './PriceComponent';
import MapComponent from './MapComponent';

import colors from "../styling/colors";
import tools from "../utils/tools";

class NewTripModal extends React.Component {

  state = {
      departure: null,
      arrival: null,
      passengersCount: null,
      price: null,
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
        console.log(this.state)
      })
      .catch(error => console.log(error.message));
  }

  passengerCountChange(num) {
    this.setState({passengersCount: num});
  }

  priceChange(num) {
    this.setState({price: num});
  }

  getCityText(type) {
    return this.state[type] ? this.state[type].name : ''
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
          <View style={styles.placePicker}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style ={styles.bigText}>Departure</Text>
                <View style={{justifyContent: 'flex-end', width: '50%'}}>
                <Icon
                  name="map-marker"
                  type="font-awesome"
                  size={50}
                  onPress={() => this.openPickModal('departure')}
                  color={colors.orange}/>
            </View>
            </View>
            <Text style={styles.pickText}>{this.getCityText('departure')}</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Text style ={styles.bigText}>Arrival</Text>
                  <View style={{justifyContent: 'flex-end', width: '50%'}}>
                  <Icon
                    name="map-marker"
                    type="font-awesome"
                    size={50}
                    onPress={() => this.openPickModal('arrival')}
                    color={colors.orange}/>
              </View>
              </View>
            <Text style={styles.pickText}>{this.getCityText('arrival')}</Text>
          </View>
          <PassengersComponent passengerCountChange={this.passengerCountChange.bind(this)}/>
          <PriceComponent priceChange={this.priceChange.bind(this)}/>
          </ScrollView>
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
     fontWeight: '500',
     color: colors.purple,
     width: '50%'
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
