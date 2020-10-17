import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default class Profile extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>History</Text>
        </View>
        <View style={{ marginTop: 150 }}>
          <View style={styles.form}>
            <View>
              <TouchableHighlight
                onPress={() => this.props.navigation.navigate("RideHistory")}
                style={styles.button}
              >
                <View style={{ flexDirection: "row" }}>
                  <Ionicons
                    name="ios-car"
                    size={32}
                    color="#D8D9DB"
                  ></Ionicons>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontWeight: "700",
                      marginLeft: 20,
                      marginTop: 7,
                    }}
                  >
                    Ride History
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
            <View style={{ marginTop: 32 }}>
              <TouchableHighlight
                onPress={() => this.props.navigation.navigate("ReviewHistory")}
                style={styles.button}
              >
                <View style={{ flexDirection: "row" }}>
                  <Ionicons
                    name="ios-bulb"
                    size={32}
                    color="#D8D9DB"
                  ></Ionicons>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontWeight: "700",
                      marginLeft: 20,
                      marginTop: 7,
                    }}
                  >
                    Reviews
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8fbc8f",
  },
  header: {
    paddingTop: 64,
    paddingBottom: 16,
    backgroundColor: "#94cb53",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBEBF4",
    shadowColor: "#454D65",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
    flexDirection: "row",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  button: {
    marginHorizontal: 50,
    backgroundColor: "#6b8e23",
    borderRadius: 50,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.7,
  },
});
