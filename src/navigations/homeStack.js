import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "../screens/homeScreen";
import AddProducts from "../screens/addProducts";
import MyOrders from "../screens/myOrders";
import Header from "../components/header";
import BookDriver from "../screens/bookDriver";
import DriverList from "../screens/driverList";
import DriverMap from "../screens/driverMap";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";

import { theme } from "../other";

const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} />,
        headerStyle: {
          backgroundColor: "cadetblue",
        },
      };
    },
  },
  AddProducts: {
    screen: AddProducts,
    navigationOptions: {
      title: "Add Products",
      headerStyle: {
        backgroundColor: "yellowgreen",
      },
    },
  },
  MyOrders: {
    screen: MyOrders,
    navigationOptions: {
      title: "My Orders",
      headerStyle: {
        backgroundColor: "yellowgreen",
      },
    },
  },
  DriverList: {
    screen : DriverList,
    navigationOptions: {
      title: "Driver List",
      headerStyle: {
        backgroundColor: "yellowgreen",
      },
    },
  },
  DriverMap: {
    screen : DriverMap,
    navigationOptions: {
      title: "My Orders",
      headerStyle: {
        backgroundColor: "yellowgreen",
      },
    },
  },
  BookDriver: {
    screen : BookDriver,
    navigationOptions: {
      title: "My Orders",
      headerStyle: {
        backgroundColor: "yellowgreen",
      },
    },
  },
};
const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "white",
    headerTitleAlign: "center",
  },
});

export default createAppContainer(HomeStack);
