import React from 'react';
import { Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';

import colors from "../styling/colors";

const Trip = ({trip}) => (
  <Card containerStyle={styles.card}>
      <Text style={styles.cities}>{trip.origin} - {trip.destination}</Text>
      <Text style={styles.time}>{trip.depTime}</Text>
      <View style={styles.lowerContainer}>
        <Text style={styles.user}>UserName</Text>
        <Button
                icon={styles.buttonIcon}
                titleStyle={styles.buttonTitle}
                containerViewStyle={styles.buttonContainer}
                buttonStyle={styles.forwardButton}/>
      </View>
  </Card>
)

const styles = {
  container: {
    flex: 1,
    borderStyle: "solid"
  },
  card: {
    marginTop: 15,
    borderRadius: 5,
    borderColor: colors.blue
  },
  cities: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.blue
  },
  time: {
    fontSize: 18,
    color: colors.orange
  },
  forwardButton: {
    backgroundColor: colors.white,
    borderWidth: 0,
    borderRadius: 50
  },
  buttonContainer: {
    width: 70   // Not playing a big role when background is same
  },
  buttonIcon: {
    name: 'arrow-forward',
    size: 30,
    color: colors.blue
  },
  user: {
    color: colors.grey,
    paddingTop: 10
  },
  lowerContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
}

export default Trip;
