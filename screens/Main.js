import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View, Modal } from 'react-native';

import { Button } from 'react-native-elements';

import SearchComponent from '../components/SearchComponent';
import NewTripModal from '../components/NewTripModal';

import colors from "../styling/colors";

class MainScreen extends React.Component {


  state = {
    newTripModalVisible: true
  };

  toggleShow = () => {
      this.setState(state => ({ newTripModalVisible: !state.newTripModalVisible }));
  };


  _onCloseModal = (state) => {

    this.s
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Kwigo</Text>
        <NewTripModal
            visible={this.state.newTripModalVisible}
            toggleShow={this.toggleShow}
        />
        <SearchComponent />
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
