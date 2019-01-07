import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, ScrollView, Button, Dimensions, RefreshControl} from 'react-native';

import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

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
    pastTrips: []
  }

  componentDidMount() {
    this.setState({refreshing: true});
    TripDS.getMyTrips().then((trips) => {
      console.log(trips)
      this.setState({offeredTrips: trips})
      this.setState({refreshing: false});
    })
  }

  render() {
    const {navigate} = this.props.navigation;

    const CurrentTrips = (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.componentDidMount.bind(this)}
          />
        }>
          <TripList title="Joined trips" trips={[]}/>
          <TripList title="Offered trips" trips={this.state.offeredTrips}/>
      </ ScrollView>
    );

    const PastTrips = (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.componentDidMount}
          />
        }>
          <TripList title="Joined trips" trips={[]}/>
          <TripList title="Offered trips" trips={this.state.offeredTrips}/>
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
            return PastTrips;
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
