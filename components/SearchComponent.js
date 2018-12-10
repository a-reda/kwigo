import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View, Button} from 'react-native';

import colors from "../styling/colors";

class SearchComponent extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput {...formatProps} placeholder="Origin" style={styles.textinputo}></TextInput>
        <TextInput {...formatProps} placeholder="Destination" style={styles.textinputd}></TextInput>
      </View>
    );
  }
}

const styles = StyleSheet.create({
   container: {
     width: "80%"
   },
  textinputo: {
    fontSize: 25,
    borderBottomWidth: 3,
    borderBottomColor: colors.orange,
    marginBottom: 20,
    color: colors.blue
  },
  textinputd: {
    fontSize: 25,
    borderBottomColor: colors.orange,
    borderBottomWidth: 3,
    color: colors.blue
  }
});

const formatProps = {
}

export default SearchComponent;
