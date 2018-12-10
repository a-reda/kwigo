import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import Icons from 'react-native-vector-icons/Ionicons';
import LoginScreen from './screens/Login'
import MainScreen from './screens/Main'
import React from "react"

import colors from "./styling/colors";

const AppNavigator = createBottomTabNavigator({
  Login: {screen: LoginScreen},
  Main: {screen: MainScreen},
  },
  {
  //initialRouteName: 'Main',
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
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
