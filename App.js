import React, { useState } from "react";
import FirebaseKeys from "./src/api/config";
import { StyleSheet } from "react-native";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./src/screens/app/homeScreen";
import AddScreen from "./src/screens/app/addProducts";
import Orders from "./src/screens/app/OrderHome";
import Profile from "./src/screens/app/Profile";

import Navigator from "./src/navigations/drawer";
import AppNavi from "./src/navigations/appStack";
import AuthNavi from "./src/navigations/authStack";
import Landing from "./src/screens/Landing";



import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}


//import * as firebase from "firebase";

const AppContainer = createStackNavigator(
  {
    default: createBottomTabNavigator(
      {
        Home: {
          screen: AppNavi,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Ionicons name="ios-home" size={24} color={tintColor}></Ionicons>
            ),
          },
        },
        Add: {
          screen: AddScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Ionicons
                name="ios-add-circle"
                size={24}
                color={tintColor}
              ></Ionicons>
            ),
          },
        },
        Orders: {
          screen: Orders,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Ionicons name="ios-cart" size={24} color={tintColor}></Ionicons>
            ),
          },
        },
        Profile: {
          screen: Profile,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Ionicons
                name="ios-arrow-dropup"
                size={24}
                color={tintColor}
              ></Ionicons>
            ),
          },
        },
      },
      {
        defaultNavigationOptions: {
          tabBarOnPress: ({ navigation, defaultHandler }) => {
            if (navigation.state.key === "Post") {
              navigation.navigate("postModal");
            } else {
              defaultHandler();
            }
          },
        },
        tabBarOptions: {
          activeTintColor: "#161F3D",
          inactiveTintColor: "#BBBBC4",
          showLabel: false,
        },
      }
    ),
    postModal: {
      screen: AddScreen,
    },
  },
  {
    mode: "modal",
    headerMode: "none",
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Landing: Landing,
      App: AppContainer,
      Auth: AuthNavi,
    },
    {
      initialRouteName: "Landing",
    }
  )
);
