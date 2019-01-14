import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native';

import OccupancyComponent from './OccupancyComponent';

import { Icon } from 'react-native-elements';

import colors from "../styling/colors";

class PassengersComponent extends React.Component {

  state = {
    count: 3
  }

  countChange(op) {
    // Check if operation is within limits
    const flag = ((op == '-') && (this.state.count == 1)) ||  ((op == '+') && (this.state.count == 5));
    if(!flag) {
      this.setState((state, props) => {
          const count = (op == '+') ? state.count + 1 : state.count - 1
          props.passengerCountChange(count)
          return {
            count: count
          }
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.opacity} onPress={() => this.countChange('-')}>
        <Icon name="ios-remove-circle"
              type="ionicon"
              size={50}
              color={colors.orange}/>
        </TouchableOpacity>
        <View style={{flexGrow: 1, justifyContent: 'center'}}>
              <OccupancyComponent  available={this.state.count} busy={0}/>
        </View>
        <TouchableOpacity style={styles.opacity} onPress={() => this.countChange('+')}>
        <Icon name="ios-add-circle"
              type="ionicon"
              size={50}
              color={colors.orange}/>
        </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
   container: {
     padding: 10,
     alignItems: 'center',
     flexDirection: 'row'
   },
   opacity: {

    padding: 5
   },
   counterRow: {
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'space-evenly',
     width: '50%'
   },
   numberText: {
     fontSize: 40,
     fontWeight: '500'
   },
   title: {
     fontSize: 25,
     fontWeight: '500',
     color: colors.purple,
   },
   passengersTitle: {
     width:'50%',
     justifyContent: 'flex-start'
   }
});

export default PassengersComponent;
