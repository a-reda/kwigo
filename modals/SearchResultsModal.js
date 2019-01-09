import React, {Component} from 'react';

import {Modal, Text, Alert, ScrollView, View, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native'

import { Icon } from 'react-native-elements';

import TripList from '../components/TripList';
import TripDS from '../datastore/trip-ds';

import TripViewModal from './TripViewModal';

import colors from "../styling/colors";
import tools from "../utils/tools";

class SearchResultsModal extends React.Component {

  state = {
    date: this.props.searchTrip.date,
    results: [],
    isLoading: false,
    selectedTrip: ''
  }

  componentDidMount() {
    this.searchTrips()
  }

  searchTrips() {
    this.setState({results: [], isLoading: true})
    TripDS.searchTrips(this.props.searchTrip.departure, this.props.searchTrip.arrival, this.state.date).then((trips) => {
      this.setState({results: trips, isLoading: false})
    })

  }

  onRequestClose() {
        Alert.alert(
            'No trip satisfies you?',
            'Create your own!',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'OK', onPress: () => this.props.toggleShow()},
          ],
            { cancelable: false });
  }

  changeDate(n) {

    const d = this.state.date;
    console.log(d)
    var nd = new Date()

    if(n>0) {   // Add one day
      nd.setDate(d.getDate()+1)
      console.log("setting to")
      console.log(nd)
    } else {    // Remove one day
      nd.setDate(d.getDate()-1)
    }

    this.setState({date: nd}, this.searchTrips)

  }

  getColorArrow() {
      return this.compareDates() ? colors.orange : colors.grey;
  }

  compareDates() {
    const d = new Date();

    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);

    if(d >= this.state.date || d.getDate() == this.state.date.getDate()) { // 07/XX/XXXX will activate it
      return false
    } else {
      return true
    }
  }

  getDepartureDate() {
    const d = this.state.date;
    return `${this.addZero(d.getDate())}/${this.addZero(d.getMonth()+1)}/${d.getFullYear()}`
  }

  addZero(n) {
    return ((n<10) ? "0" : "") + n.toString();
  }

  onTripSelected = (id) => {
    this.setState({selectedTrip: id})
  }

  onCloseTripView = (isCheckedIn) => {
    this.setState({selectedTrip: null})
    console.log(isCheckedIn);
  }

  render() {
    return (
      <Modal  visible={this.props.visible}
              animationType="slide"
              style={styles.container}
              onRequestClose={this.onRequestClose.bind(this)}>

        { this.state.selectedTrip ?
        <TripViewModal
              mode='JOIN'
              visible={true}
              tripId={this.state.selectedTrip}
              onRequestClose={this.onCloseTripView}
        /> : null}
        <View style={styles.container}>
          <View style={styles.header}>
            <Icon
              name="md-arrow-round-back"
              type="ionicon"
              size={55}
              onPress={this.onRequestClose.bind(this)}
              color='white'/>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>
                {`${this.props.searchTrip.departure} - ${this.props.searchTrip.arrival}`}
                </Text>
              </View>
          </View>
          <View style={styles.dateSelector}>
          { this.compareDates() ?
            <TouchableOpacity style={{width: '10%'}} onPress={() => this.changeDate(-1)}>
              <Icon
                name="ios-arrow-back"
                disabled={this.compareDates()}
                size={35}
                type="ionicon"
                color={this.getColorArrow()}/></TouchableOpacity> : <View style={{width: '10%'}}/>}
              <Text style={styles.date}>{this.getDepartureDate(this.state.date)}</Text>
            <TouchableOpacity style={{width: '10%'}} onPress={() => this.changeDate(-1)}>
              <Icon
                name="ios-arrow-forward"
                size={35}
                type="ionicon"
                onPress={() => this.changeDate(1)}
                color={colors.orange}/></TouchableOpacity>
          </View>
          {this.state.isLoading ?
            <ActivityIndicator color={colors.orange} size='large'/>
          : <TripList onTripSelected={this.onTripSelected} trips={this.state.results} title="trips" hideTitle={true} /> }
          </View>
      </Modal>
    );
  }

}

const styles = StyleSheet.create({
  container: {flex:1},
  titleContainer:{
    flex: 2,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title:{
    fontWeight: "bold",
    fontSize: 25,
    color: colors.blue
  },
  header: {
    flexDirection: 'row',
    backgroundColor: colors.orange,
    padding: 10,
  },
  dateSelector: {
    padding: 10,
    flexDirection: 'row',
    borderBottomColor: colors.lightgrey,
    borderBottomWidth: 1,
    justifyContent: 'space-between'
  },
  date: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.blue,
    alignSelf: 'center'
  }
})

export default SearchResultsModal;
