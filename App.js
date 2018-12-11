import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import Icons from 'react-native-vector-icons/Ionicons';
import React from "react"


// Screens
import LoginScreen from './screens/Login'
import MainScreen from './screens/Main'
import TripsScreen from './screens/Trips'
import TripView from './screens/TripView'


import colors from "./styling/colors";

const AppNavigator = createBottomTabNavigator({
  Login: {screen: LoginScreen},
  Main: {screen: MainScreen},
  Trips: {screen: TripsScreen},
  TripView: {screen: TripView}, // Temporary because this shouldn't be accessed from this navigator
  },
  {
  initialRouteName: 'TripView',
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName = `md-car`;
        if (routeName === 'Login') {
          iconName = `md-car`;
        } else if (routeName === 'Main') {
          iconName = `md-search`;
        }
        return <Icons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: colors.orange,
      inactiveTintColor: colors.grey,
    }
  });

export default createAppContainer(AppNavigator);
