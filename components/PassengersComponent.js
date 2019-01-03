import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

import { Icon } from 'react-native-elements';

import colors from "../styling/colors";

class PassengersComponent extends React.Component {

  state = {
    count: 1
  }

  countChange(op) {
    // Check if operation is within limits
    const flag = ( (op == '-') && (this.state.count == 1) ) ||  ( (op == '+') && (this.state.count == 5) );
    console.log(flag)
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
        <Text>Passengers</Text>
        <View style={styles.counterRow}>
        <Icon name="ios-remove-circle"
              type="ionicon"
              size={50}
              onPress={() => this.countChange('-')}
              color={colors.orange}/>
        <Text style={styles.numberText}>{this.state.count}</Text>
        <Icon name="ios-add-circle"
              type="ionicon"
              size={50}
              onPress={() => this.countChange('+')}
              color={colors.orange}/>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
   container: {
     flex: 1,
     padding: 10
   },
   counterRow: {
     flexDirection: 'row',
     alignItems: 'center'
   },
   numberText: {
     fontSize: 40,
     fontWeight: '500'
   }
});

export default PassengersComponent;
