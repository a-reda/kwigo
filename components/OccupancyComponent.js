import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View, Button} from 'react-native';

import { Icon } from 'react-native-elements';

import colors from "../styling/colors";

class OccupancyComponent extends React.Component {

  getAvailable(n, isBusy) {
    available = [];
    for (let i=0; i< n; i++) {
        available.push(<Icon
                  key={i}
                  size={40}
                  name="user"
                  color={isBusy ? colors.busy : colors.available}
                  type="feather"/>);
    }
    return available;

  }

  render() {
    return (
      <View style={styles.container}>
        {this.getAvailable(this.props.available - this.props.busy, false)}
        {this.getAvailable(this.props.busy, true)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
   container: {
     padding:10,
     flexDirection: 'row',
     justifyContent: "center"
   }
});

export default OccupancyComponent;
