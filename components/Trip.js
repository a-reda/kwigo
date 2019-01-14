import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements';

import colors from "../styling/colors";
import tools from "../utils/tools";

const Trip = ({trip, removeDate, onPress}) =>
(
  <Card containerStyle={styles.card} key={trip.id}>
    <TouchableOpacity onPress={() => onPress(trip.id)}>
      <Text style={styles.cities}>
        {`${trip.departure ? trip.departure.city : ''} - ${trip.arrival ? trip.arrival.city : ''}`}
      </Text>
      <Text style={styles.time}>{removeDate ? `${tools.getDepartureTime(new Date(trip.date))}` : `${tools.getFormatedDate(new Date(trip.date))}`}</Text>
      <View style={styles.lowerContainer}>
        <Text style={styles.user}>{`${trip.driver ? trip.driver.name : ''}`}</Text>
      </View>
    </TouchableOpacity>
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
    //width: 70   // Not playing a big role when background is same
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
