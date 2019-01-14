import {createBottomTabNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation';
import Icons from 'react-native-vector-icons/Ionicons';
import React from "react"

import { Text } from 'react-native';
// Screens
import Main from './screens/newtrip/trips'
import TripsScreen from './screens/Trips'
import TripLive from './screens/TripLive'
import UserScreen from './screens/User'

import NewTripNavigator from './screens/newtrip/newTrip'

import LoginScreen from './screens/auth/Login'
import AuthLoadingScreen from './screens/auth/AuthLoading'
import SignUpScreen from './screens/auth/SignUp'


import colors from "./styling/colors";

const AppNavigator = createBottomTabNavigator({
  Main: {screen: Main},
  Trips: {screen: TripsScreen},
  TripLive: {screen: TripLive}, // Temporary because this shouldn't be accessed from this navigator
  User: {screen: UserScreen}
  },
  {
  initialRouteName: 'User',
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName = `md-car`;
        if (routeName === 'Main') {
          iconName = `md-search`;
        } else if (routeName === 'TripLive') {
          iconName = `md-locate`;
        } else if (routeName === 'User') {
          iconName = `md-person`;
        } else if (routeName === 'Trips') {
          iconName = `md-list`;
        }
        return <Icons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      },
    tabBarLabel: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let text = ``;
        if (routeName === 'Main') {
          text = `Search`;
        } else if (routeName === 'TripLive') {
          text = `Live`;
        } else if (routeName === 'User') {
          text = `Profile`;
        } else if (routeName === 'Trips') {
          text = `Trips`;
        }
        return <Text style={{alignSelf: 'center'}}>{text}</Text>;
      }
    }),
    tabBarOptions: {
      activeTintColor: colors.orange,
      inactiveTintColor: colors.grey,
    }
  });

const AuthStack = createSwitchNavigator({
    AuthLoading: {screen: AuthLoadingScreen},
    Login: {screen: LoginScreen},
    SignUp: {screen: SignUpScreen},
    App: AppNavigator
    },
    {
      initialRouteName: 'AuthLoading',
      headerMode: 'none'
    }

);

export default createAppContainer(AuthStack);
