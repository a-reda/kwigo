import React, {Component} from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, AsyncStorage,
          Button, Dimensions, RefreshControl} from 'react-native';

import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import TripViewModal from '../modals/TripViewModal';

import SearchComponent from '../components/SearchComponent';
import TripList from '../components/TripList';

import colors from "../styling/colors";

import TripDS from '../datastore/trip-ds';

class TripsScreen extends React.Component {

  state = {
    refreshing: false,
    index: 0,
    routes: [
      {key: 'current', title: 'Current trips'},
      {key: 'past', title: 'Past trips'}
    ],
    offeredTrips: [],
    registeredTrips: [],
    selectedTrip: '',
    selectedTripP: ''
  }

  componentDidMount() {
    this.willFocusListener = this.props.navigation.addListener('willFocus', (payload) => {
       AsyncStorage.getItem('shouldRefreshTrips').then((val) => {
         if(val == 'true') {
           this.refreshState();
           AsyncStorage.setItem('shouldRefreshTrips', 'false');
         }
       })
    });
    this.refreshState();
  }

  refreshState = () => {
    this.setState({refreshing: true});
    promises = [];
    promises.push(TripDS.getMyTrips().then((trips) => {
      this.setState({offeredTrips: trips})
    }))
    promises.push(TripDS.registeredTrips().then((trips) => {
      this.setState({registeredTrips: trips})
    }))
    Promise.all(promises).then(this.setState({refreshing: false}));
  }

  componentWillUnmount() {
    this.willFocusListener.remove();
  }

  onTripSelected = (id) => {
    this.setState({selectedTrip: id})
  }

  onRequestClose = (result) => {
    if(result) this.refreshState();
    this.setState({selectedTrip: ''})
  }

  render() {
    const {navigate} = this.props.navigation;

    var CurrentTrips = (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.refreshState}
          />
        }>
          { this.state.selectedTrip ?
          <TripViewModal
                visible={true}
                mode='VIEW'
                tripId={this.state.selectedTrip}
                onRequestClose={this.onRequestClose}
          />  : null}
          <TripList onTripSelected={this.onTripSelected} title="Joined trips" trips={this.state.registeredTrips.filter((e) => e.date >= (new Date()))}/>
          <TripList onTripSelected={this.onTripSelected} title="Offered trips" trips={this.state.offeredTrips.filter((e) => e.date >= (new Date()))}/>
      </ ScrollView>
    );

    var RegisteredTrips = (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.refreshState}
          />
        }>
          <TripList onTripSelected={this.onTripSelected} title="Joined trips" trips={this.state.registeredTrips.filter((e) => e.date < (new Date()))}/>
          <TripList onTripSelected={this.onTripSelected} title="Offered trips" trips={this.state.offeredTrips.filter((e) => e.date < (new Date()))}/>
      </ ScrollView>
    );

    return (
      <TabView
      navigationState={this.state}
      renderScene={({route}) => {
        switch (route.key) {
          case 'current':
            return CurrentTrips;
          case 'past':
            return RegisteredTrips;
          default:
            null
        }
      }}
      onIndexChange={index => this.setState({ index })}
      initialLayout={{ width: Dimensions.get('window').width,  height: Dimensions.get('window').height}}
      renderTabBar={props =>
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: colors.white }}
              tabStyle={{ backgroundColor: colors.orange }}
            />
          }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    color: colors.purple,
    fontWeight: '500',
    fontSize: 20,
    paddingLeft: 10,
    paddingTop: 10
  }
});

export default TripsScreen;
