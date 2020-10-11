import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
} from "react-native";

import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import DropDownPicker from "react-native-dropdown-picker";

import Fire from "../../api/Fire";
import { Ionicons } from "@expo/vector-icons";

const firebase = require("firebase");
require("firebase/firestore");

export default class addProducts extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    quantity: "",
    price: "",
    crop: "",
    image: null,
    economicCenter: "",
    isVisibleText: false,
    isVisibleEcon: false,
  };

  changeVisibility(state) {
    this.setState({
      isVisibleText: false,
      isVisibleEcon: false,
      ...state,
    });
  }

  checkInput = () => {
    if (this.state.crop != "") {
      if (this.state.economicCenter != "") {
        if (this.state.price != "") {
          if (this.state.quantity != "") {
            this.handlePost();
          } else {
            alert("Enter the Quantity");
          }
        } else {
          alert("Enter the Price");
        }
      } else {
        alert("Select the Economic Center");
      }
    } else {
      alert("Select the Crop Type");
    }
  };

  handlePost = () => {
    Fire.shared
      .addPost({
        crop: this.state.crop.trim(),
        quantity: this.state.quantity.trim(),
        economicCenter: this.state.economicCenter.trim(),
        price: this.state.price.trim(),
        localUri: this.state.image,
      })
      .then((ref) => {
        this.setState({
          crop: "",
          quantity: "",
          economicCenter: "",
          price: "",
          image: null,
        });
        this.props.navigation.navigate("Home");
      })
      .catch((error) => {
        alert(error);
      });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ marginTop: 66 }}>
            <View style={styles.form}>
              <View style={{ marginTop: 12 }}>
                <DropDownPicker
                  items={[
                    {
                      label: "Select the Crop Type",
                      value: "",
                      selected: true,
                      disabled: false,
                    },
                    {
                      label: "Potato (අල)",
                      value: "Potato (අල)",
                    },
                    { label: "Beans (බෝංචි)", value: "Beans (බෝංචි)" },
                    { label: "Carrot (කැරට්)", value: "Carrot (කැරට්)" },
                    {
                      label: "Pumpkin (වට්ටක්කා)",
                      value: "Pumpkin (වට්ටක්කා)",
                    },
                    { label: "Chilli (මිරිස්)", value: "Chilli (මිරිස්)" },
                    { label: "Cabbage (ගෝවා)", value: "Cabbage (ගෝවා)" },
                    { label: "Brinjal (වම්බටු)", value: "Brinjal (වම්බටු)" },
                    { label: "Tomato (තක්කාලි)", value: "Tomato (තක්කාලි)" },
                  ]}
                  placeholder="Select the Crop Type"
                  defaultValue={this.state.crop}
                  containerStyle={{ height: 40 }}
                  style={{ backgroundColor: "white" }}
                  dropDownStyle={{
                    backgroundColor: "white",
                    marginTop: -100,
                  }}
                  isVisible={this.state.isVisibleText}
                  onOpen={() =>
                    this.changeVisibility({
                      isVisibleText: true,
                    })
                  }
                  onClose={() =>
                    this.setState({
                      isVisibleText: false,
                    })
                  }
                  onChangeItem={(item) =>
                    this.setState({
                      crop: item.value,
                    })
                  }
                />
              </View>

              <View style={{ marginTop: 32 }}>
                <DropDownPicker
                  items={[
                    {
                      label: "District",
                      value: "",
                      selected: true,
                      disabled: true,
                    },
                    { label: "Anuradhapura", value: "Anuradhapura" },
                    { label: "Badulla", value: "Badulla" },
                    {
                      label: "Bandarawela",
                      value: "Bandarawela",
                    },
                    {
                      label: "Nuwara Eliya",
                      value: "Nuwara Eliya",
                    },
                    {
                      label: "Thambuththegama",
                      value: "Thambuththegama",
                    },
                  ]}
                  placeholder="Select the Economic Center"
                  defaultValue={this.state.economicCenter}
                  containerStyle={{ height: 40 }}
                  style={{ backgroundColor: "white" }}
                  dropDownStyle={{
                    backgroundColor: "white",
                    marginTop: -100,
                  }}
                  isVisible={this.state.isVisibleEcon}
                  onOpen={() =>
                    this.changeVisibility({
                      isVisibleEcon: true,
                    })
                  }
                  onClose={() =>
                    this.setState({
                      isVisibleEcon: false,
                    })
                  }
                  onChangeItem={(item) =>
                    this.setState({
                      economicCenter: item.value,
                    })
                  }
                />
              </View>

              <View style={{ marginTop: 32 }}>
                <TouchableOpacity
                  style={styles.button}
                  /* onPress={() => console.log(this.state.crop)} */
                  onPress={() =>
                    this.props.navigation.navigate("CropView", {
                      crop: this.state.crop,
                      economicCenter: this.state.economicCenter,
                    })
                  }
                >
                  <Ionicons
                    name="ios-search"
                    size={25}
                    color="#D8D9DB"
                  ></Ionicons>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8fbc8f",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: "#000000",
    fontSize: 14,
    textTransform: "uppercase",
  },
  input: {
    borderBottomColor: "#000000",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D",
  },
  photo: {
    alignItems: "center",
  },
  button: {
    marginHorizontal: 120,
    backgroundColor: "#6b8e23",
    borderRadius: 40,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
});
