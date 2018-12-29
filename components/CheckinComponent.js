import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View, Button} from 'react-native';

import colors from "../styling/colors";

class CheckinComponent extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Milano Padova</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
   container: {
     flex: 2,
     //justifyContent: "space-around"
   }
});

export default CheckinComponent;
