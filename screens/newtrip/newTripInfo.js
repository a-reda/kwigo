import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import colors from "../../styling/colors";


class NewTripInfo extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Departure place</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
  }
});

export default NewTripInfo;
