import { createStackNavigator } from 'react-navigation';

import NewTripNavigator from './newTrip';
import MainScreen from '../Main';

const TripsNavigator = createStackNavigator({
  newTrip: {screen: NewTripNavigator},
  Mains: {screen: MainScreen}
  },{
  initialRouteName: 'Mains',
  headerMode: 'none'
  });

export default TripsNavigator;
