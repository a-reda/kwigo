import React from 'react';
import { View, Text } from 'react-native';
import { List } from 'react-native-elements';

import Trip from './Trip';

const TripList = ({trips}) => (
<View>
  {trips.map((t) => (<Trip trip={t} />))}
</View>
)

export default TripList;
