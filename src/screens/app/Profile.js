import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class Profile extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Market </Text>
      </View>
      <View style={styles.container}>
        <Text> Market </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
