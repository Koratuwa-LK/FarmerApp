import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Header({ navigation }) {
  const openMenu = () => {
    navigation.openDrawer();
  };
  return (
    <View style={styles.header}>
      <MaterialIcons
        name="menu"
        onPress={openMenu}
        size={27}
        style={{ position: "relative", left: -140, color: "white" }}
      ></MaterialIcons>
      <View>
        <Text style={styles.headerText}>Home</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: 1000,
    height: 3,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "cadetblue",
    left: -12,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    letterSpacing: 1,
  },
});
