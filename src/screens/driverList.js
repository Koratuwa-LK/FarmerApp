import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Alert,
  Picker,
  ImageBackground,
  TouchableHighlight,
} from "react-native";
import { Button, shadow } from "react-native-paper";
import axios from "../../axioslist";
import { TouchableOpacity } from "react-native-gesture-handler";

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
        timeout: 5000,
      });
      console.log("hey" + location);
      setlocationpicked({
        lat: 37.78, //.coords.latitude,
        lng: -122.43, //location.coords.longitude,
      });
      props.onpickedlocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        /* 'Couldn`t locate you',
                'Please try later or pick a location on the map',
                [{text: 'OK'}] */
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
        const hotel = [];
        const obj = response.data;
        for (let key in obj) {
          if (obj[key].status == "Online" && obj[key].ecocentre == ecocentre) {
            hotel.push({
              id: key,
              location: obj[key].location,
              status: obj[key].status,
              name: obj[key].name,
            });
          }
        }

        setdriverslist(hotel);
        console.log(hotel);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showlist = () => {
    console.log(driverslist);
  };

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../../assets/images/driverScreen1.jpg")}
    >
      <View style={{ alignItems: "center", marginTop: 100 }}>
        <Button onPress={locationHandler}>set my location</Button>
        <Button onPress={driversHandler}>view drivers in my area</Button>

        <Picker
          selectedValue={ecocentre}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setecocentre(itemValue)}
        >
          <Picker.Item label="Dambulla" value="Dambulla" />
          <Picker.Item label="Thambuththegama" value="Thambuththegama" />
        </Picker>
        <View style={{ marginTop: 150 }}>
          <FlatList
            data={driverslist}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate("DriverMap", {
                      lat: item.location.lat,
                      lng: item.location.lng,
                      userloc: locationpicked,
                      name: "item.name",
                    });
                  }}
                >
                  <View style={styles.tile}>
                    <Text>{item.name}</Text>
                    <Text>{item.status}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  tile: {
    height: 100,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});

export default driverList;
