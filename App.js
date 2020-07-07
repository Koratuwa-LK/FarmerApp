import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  SafeAreaView,
} from "react-native";

import Navigator from "./src/navigations/drawer";
import Drawer from "./src/navigations/drawer"

export default function App() {
  return (
      <Navigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
