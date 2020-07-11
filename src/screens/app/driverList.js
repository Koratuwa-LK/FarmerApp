import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Alert,
  Picker,
  ImageBackground,
  Dimensions,
  Image,
  TouchableHighlight,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "../../../axioslist";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Card, Badge, Block, Caption } from "../../components";
import { theme } from "../../other";

const { width } = Dimensions.get("window");

import * as Maplocation from "expo-location";
import * as Permissions from "expo-permissions";

const driverList = (props, { navigation }) => {
  const [locationpicked, setlocationpicked] = useState();
  const [isfetching, setisfetching] = useState(null);
  const [driverslist, setdriverslist] = useState();
  const [ecocentre, setecocentre] = useState("Dambulla");

  const Permissionverify = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status != "granted") {
      Alert.alert("permission need", "need permissions to proceed", [
        { text: "OK" },
      ]);
      return false;
    }
    return true;
  };

  const locationHandler = async () => {
    const haspermission = await Permissionverify();
    if (!haspermission) {
      return;
    }

    setisfetching(true);

    try {
      const location = await Maplocation.getCurrentPositionAsync({
        timeout: 500,
      });
      console.log("hey" + location.coords.latitude);
      setlocationpicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      props.onpickedlocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        "Successfully located",
        "Your current location successfully saved",
        [{ text: "OK" }]
      );
    }
    setisfetching(false);
  };

  const driversHandler = () => {
    axios
      .get("/drivers.json")
      .then((response) => {
        const driveDetails = [];
        const obj = response.data;
        for (let key in obj) {
          if (obj[key].status == "Online" && obj[key].ecocentre == ecocentre) {
            driveDetails.push({
              id: key,
              location: obj[key].location,
              status: obj[key].status,
              name: obj[key].name,
              maxSize: obj[key].maxsize,
              plateNum: obj[key].plateno,
            });
          }
        }

        setdriverslist(driveDetails);
        console.log(driveDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showlist = () => {
    console.log(driverslist);
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 40 }}>
        <View style={styles.form}>
          <View>
            <TouchableHighlight onPress={locationHandler} style={styles.button}>
              <View style={{ flexDirection: "row" }}>
                <Ionicons name="ios-pin" size={32} color="#D8D9DB"></Ionicons>
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "700",
                    marginLeft: 20,
                    marginTop: 7,
                  }}
                >
                  Set My Location
                </Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}> Select Economic Center </Text>
          </View>
          <View style={{ marginTop: 12, alignItems: "center" }}>
            <Picker
              selectedValue={ecocentre}
              style={{
                height: 200,
                width: 200,
                backgroundColor: "ivory",
                opacity: 0.8,
                borderRadius: 10,
              }}
              onValueChange={(itemValue, itemIndex) => setecocentre(itemValue)}
            >
              <Picker.Item label="Dambulla" value="Dambulla" />
              <Picker.Item label="Meegoda" value="Meegoda" />
              <Picker.Item label="Thambuththegama" value="Thambuththegama" />
              <Picker.Item label="Narahenpita" value="Narahenpita" />
            </Picker>
          </View>
          <View style={{ marginTop: 32 }}>
            <TouchableHighlight onPress={driversHandler} style={styles.button}>
              <View style={{ flexDirection: "row" }}>
                <Ionicons
                  name="ios-arrow-dropdown-circle"
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
                  View Drivers
                </Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={{ marginTop: 30 }}>
            <FlatList
              data={driverslist}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <View style={{flex:1}}>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate("DriverMap", {
                          lat: item.location.lat,
                          lng: item.location.lng,
                          name: item.name,
                          userloc: locationpicked,
                        });
                      }}
                    >
                      <View style={styles.feedItem}>
                        <View style={{ flex: 1 }}>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <View>
                              <Text style={styles.name}>
                                Driver Name : {item.name}
                              </Text>
                              <Text style={styles.name}>
                                Maximum Capacity: {item.maxSize}Kg
                              </Text>
                              <Text style={styles.name}>
                                Plate Number: {item.plateNum}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <Ionicons
                          name="ios-car"
                          size={32}
                          color="#03512a"
                        ></Ionicons>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8fbc8f",
  },
  tile: {
    height: 100,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "white",
  },
  feedItem: {
    backgroundColor: "#d9e3f0",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#03512a",
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  category: {
    // this should be dynamic based on screen width
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 9 - theme.sizes.base) / 2,
    opacity: 0.8,
  },
  inputTitle: {
    color: "#FFF",
    fontSize: 14,
    textTransform: "uppercase",
    marginHorizontal: 75,
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

export default driverList;
