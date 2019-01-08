import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { List } from 'react-native-elements';

import Trip from './Trip';

import colors from "../styling/colors";

const TripList = ({trips, title, hideTitle, onTripSelected}) => (
<ScrollView>
  { hideTitle ? null : <Text style={styles.title}>{title}</Text> }
  { trips.length ? null : <Text style={styles.greyTitle}>No {title.toLowerCase()} available</Text>}
  { trips.map((t) => (<Trip key={t.id} trip={t} onPress={onTripSelected} removeDate={hideTitle} />))}
</ScrollView>
)

const styles = StyleSheet.create({
  title: {
    color: colors.purple,
    fontWeight: '500',
    fontSize: 20,
    paddingLeft: 15,
    paddingTop: 10
  },
  greyTitle: {
    alignSelf: 'center',
    paddingTop: 10
  }
});

export default TripList;
