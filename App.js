import {createBottomTabNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation';
import Icons from 'react-native-vector-icons/Ionicons';
import React from "react"


// Screens
import MainScreen from './screens/Main'
import TripsScreen from './screens/Trips'
import TripView from './screens/TripView'
import UserScreen from './screens/User'

import LoginScreen from './screens/auth/Login'
import AuthLoadingScreen from './screens/auth/AuthLoading'
import SignUpScreen from './screens/auth/SignUp'


import colors from "./styling/colors";

const AppNavigator = createBottomTabNavigator({
  Main: {screen: MainScreen},
  Trips: {screen: TripsScreen},
  TripView: {screen: TripView}, // Temporary because this shouldn't be accessed from this navigator
  User: {screen: UserScreen},
  },
  {
  initialRouteName: 'Main',
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
