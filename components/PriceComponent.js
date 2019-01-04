import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

import { Icon } from 'react-native-elements';

import colors from "../styling/colors";

class PriceComponent extends React.Component {

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.priceTitle}>
            <Text style={styles.title}>Contribution</Text>
          </View>
          <View style={styles.textInput}>
          <TextInput
            style={styles.numberText}
            defaultValue='0'
            keyboardType='number-pad'
            returnKeyType="next"
            placeholderTextColor='black'
            onChangeText={val => this.props.priceChange(val)}
          />
          <Text style ={styles.numberText}>€/P</Text>
      </View>
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
   textInput: {
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'space-evenly',
     width: '50%'
   },
   numberText: {
     fontSize: 40,
     fontWeight: '500',
     color: colors.grey
   },
   title: {
     fontSize: 25,
     fontWeight: '500',
     color: colors.purple,
   },
   priceTitle: {
     width:'50%',
     justifyContent: 'flex-start'
   }
});

export default PriceComponent;
