import {createBottomTabNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation';
import Icons from 'react-native-vector-icons/Ionicons';
import React from "react"


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
  initialRouteName: 'TripLive',
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
