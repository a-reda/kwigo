import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View, Button} from 'react-native';

import colors from "../styling/colors";

class SearchComponent extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput placeholder="Origin" style={styles.textinputo} onSubmitEditing={() => this.refs.destination.focus()}></TextInput>
        <TextInput placeholder="Destination" style={styles.textinputd} ref="destination" onSubmitEditing={search}></TextInput>
        <View style={styles.buttonContainer}>
          <Button
                title="Go!"
                onPress={search}
                color={colors.blue}
          />
        </View>
      </View>
    );
  }
}

const search = () => {
  console.log("Search running")
}

const styles = StyleSheet.create({
   container: {
     width: "80%",
     justifyContent: "space-around"
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
  },
  buttonContainer: {
    paddingTop: 20
  }
});

export default SearchComponent;
