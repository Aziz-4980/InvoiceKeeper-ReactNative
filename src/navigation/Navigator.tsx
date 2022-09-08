/**
 * Created by Dima Portenko on 05.07.2021
 */
import React, { Component } from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import * as routes from './routes';
import {SelectImageScreen} from '../screens/SelectImageScreen';
import {ProcessImageScreen} from '../screens/ProcessImageScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen'
import ReportsScreen from '../screens/ReportsScreen';
import {RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  [routes.SELECT_SCREEN]: undefined;
  [routes.HOME_SCREEN]: undefined;
  [routes.LOGIN_SCREEN]: undefined;
  [routes.REPORT_SCREEN]: undefined;
  [routes.PROCESS_IMAGE_SCREEN]: {
    uri: string;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export type SelectScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  typeof routes.SELECT_SCREEN
>;
export type LoginRouteProps = RouteProp<
  RootStackParamList,
  typeof routes.LOGIN_SCREEN
>;
export type ProcessImageNavigationProps = StackNavigationProp<
  RootStackParamList,
  typeof routes.PROCESS_IMAGE_SCREEN
>;

export type ProcessImageRouteProps = RouteProp<
  RootStackParamList,
  typeof routes.PROCESS_IMAGE_SCREEN
>;






export const Navigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerTintColor: 'black',
    }}>
    <Stack.Screen name={routes.LOGIN_SCREEN} component={LoginScreen} />
   
    <Stack.Screen name={routes.SELECT_SCREEN} component={SelectImageScreen} />
    <Stack.Screen name={routes.PROCESS_IMAGE_SCREEN}  component={ProcessImageScreen}/>
    <Stack.Screen name={routes.HOME_SCREEN} component={HomeScreen} />
    <Stack.Screen name={routes.REPORT_SCREEN} component={ReportsScreen}/>
  </Stack.Navigator>
);
