import { createStackNavigator } from 'react-navigation';

import NewTripDepartureScreen from './newTripDeparture';
import NewTripArrivalScreen from './newTripArrival';
import NewTripTimeScreen from './newTripTime';
import NewTripInfoScreen from './newTripInfo';

const NewTripNavigator = createStackNavigator({
  NewTripDeparture: {screen: NewTripDepartureScreen},
  NewTripArrival: {screen: NewTripArrivalScreen},
  NewTripTime: {screen: NewTripTimeScreen},
  NewTripInfo: {screen: NewTripInfoScreen}
  },{
  navigationOptions:{
    tabBarVisible: false
  },
  initialRouteName: 'NewTripDeparture',
  headerMode: 'none'
  });

export default NewTripNavigator;
