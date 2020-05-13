import React from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";

export default function myOrders() {
  return (
    <View style={{flex:1, backgroundColor: 'green'}}>
      
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    paddingTop: 38,
    backgroundColor: "seagreen",
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  img: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
});
