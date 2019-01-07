import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View, Modal } from 'react-native';

import { Button } from 'react-native-elements';

import SearchComponent from '../components/SearchComponent';
import NewTripModal from '../modals/NewTripModal';
import SearchResultsModal from '../modals/SearchResultsModal';

import colors from "../styling/colors";

class MainScreen extends React.Component {


  state = {
    newTripModalVisible: false,
    searchTripModalVisible: true,
    searchTrip: {departure: 'Milano', arrival: 'Milano', date: new Date()}
  };

  toggleShow = () => {
      // Here it should get if a new trip was created
      this.setState(state => ({ newTripModalVisible: !state.newTripModalVisible }));
  };

  toggleShowSearch = (trip) => {
      console.log(trip)
      // Here it should get if a new trip was created
      this.setState(state => ({
        searchTripModalVisible: !state.searchTripModalVisible,
        searchTrip: trip
      }));
  };


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Kwigo</Text>
        { this.state.newTripModalVisible ?
        <NewTripModal
            visible={this.state.newTripModalVisible}
            toggleShow={this.toggleShow}
        /> : null }
        { this.state.searchTripModalVisible ?
        <SearchResultsModal
            visible={this.state.searchTripModalVisible}
            toggleShow={this.toggleShowSearch}
            searchTrip={this.state.searchTrip}
        /> : null }
        <SearchComponent onPressSearch={this.toggleShowSearch}/>
        <View style={styles.buttonContainer}>
          <Button
              icon={{name:'add'}}
              backgroundColor={colors.orange}
              title='New'
              onPress={this.toggleShow}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  logo: {
    color: colors.purple,
    fontSize: 70,
    textAlign: 'center',
    margin: 10,
  }
});

export default MainScreen;
