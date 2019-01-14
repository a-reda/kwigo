import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native';

import { Icon } from 'react-native-elements';

import colors from "../styling/colors";

class PriceComponent extends React.Component {

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={() => this.priceInput.focus()}>
          <TextInput
            style={styles.numberTextInput}
            ref={(input)=> this.priceInput = input}
            defaultValue='5'
            keyboardType='number-pad'
            returnKeyType="done"
            placeholderTextColor='black'
            onChangeText={val => this.props.priceChange(val)}
          />
          <Text style ={styles.numberText}>€/person</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
   container: {
     alignItems: 'center',
     justifyContent: 'center',
     flexDirection: 'row'
   },
   textInput: {
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'space-evenly',
     width: '50%'
   },
   numberTextInput: {
     fontSize: 30,
     fontWeight: '500',
     color: colors.grey
   },
   numberText: {
     fontSize: 25,
     fontWeight: '500',
     color: colors.grey
   }
});

export default PriceComponent;
