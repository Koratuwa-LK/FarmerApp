import React, { Component, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TimePicker from "react-native-24h-timepicker";
import axios from "../../../axioslist";
import Fire from "../../api/Fire";
import DropDownPicker from "react-native-dropdown-picker";
import { theme } from "../../other";

const { width } = Dimensions.get("window");

class bookingscreen extends Component {
  state = {
    time: "",
    name: "tony",
    farmername: "",
    farmerNumber: "",
    quantity: "",
    crop: "",
    link: {
      uri: "",
    },
  };

  componentDidMount() {
    const farmername = Fire.shared.getName;
    const farmerNumber = Fire.shared.getPhoneNum;
    this.setState({
      link: {
        uri: "/drivers/" + this.props.navigation.getParam("name") + "/.json",
      },
      farmername,
      farmerNumber,
    });
  }

  checkInput = () => {
    if (this.state.crop != "") {
      if (this.state.quantity != "") {
        this.checkout();
      } else {
        alert("Enter the Quantity");
      }
    } else {
      alert("Enter the Crop");
    }
  };

  checkout() {
    axios
      .post("/farmerbookings.json", {
        farmername: this.state.farmername,
        drivername: this.props.navigation.getParam("name"),
        farmernumer: this.state.farmerNumber,
        time: this.state.time,
        crop: this.state.crop,
        quantity: this.state.quantity,
        lat: this.props.navigation.getParam("lat"),
        lng: this.props.navigation.getParam("lng"),
      })
      .then((response) => {
        console.log(response);
        this.setState({
          crop: "",
        });
        this.props.navigation.navigate("Home");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onCancel() {
    this.TimePicker.close();
  }

  onConfirm(hour, minute) {
    this.setState({ time: `${hour}:${minute}` });
    this.TimePicker.close();
  }

  render() {
    return (
      <View style={styles.container}>
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
                      disabled: true,
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
                    { label: "Tomato (තක්කාලි)", value: "Tomato (තක්කාලි)" },
                    { label: "Brinjal (වම්බටු)", value: "Brinjal (වම්බටු)" },
                    { label: "Tomato (තක්කාලි)", value: "Tomato (තක්කාලි)" },
                  ]}
                  placeholder="Select the Crop Type"
                  defaultValue={this.state.crop}
                  containerStyle={{ height: 60, borderRadius: 28 }}
                  style={{ backgroundColor: "white" }}
                  dropDownStyle={{
                    backgroundColor: "white",
                    marginTop: -100,
                  }}
                  onChangeItem={(item) =>
                    this.setState({
                      crop: item.value,
                    })
                  }
                />
              </View>
              <View style={{ marginTop: 52 }}>
                <Text style={styles.inputTitle}> Quantity(kg) </Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  onChangeText={(quantity) => this.setState({ quantity })}
                  value={this.state.quantity}
                  keyboardType={"numeric"}
                ></TextInput>
              </View>
              <View style={{ marginTop: 52 }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.TimePicker.open()}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Ionicons
                      name="ios-time"
                      size={32}
                      color="#D8D9DB"
                    ></Ionicons>
                    <Text
                      style={{
                        marginLeft: 20,
                        color: "#FFF",
                        fontSize: 22,
                        marginTop: 4,
                      }}
                    >
                      Pickup Time
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 52 }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.checkInput();
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Ionicons
                      name="ios-rocket"
                      size={32}
                      color="#D8D9DB"
                    ></Ionicons>
                    <Text
                      style={{
                        marginLeft: 20,
                        color: "#FFF",
                        fontSize: 22,
                        marginTop: 4,
                      }}
                    >
                      Book Now
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TimePicker
          ref={(ref) => {
            this.TimePicker = ref;
          }}
          onCancel={() => this.onCancel()}
          onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#52997f",
  },
  text: {
    fontSize: 20,
    marginTop: 3,
  },
  button: {
    backgroundColor: "orange",
    paddingVertical: 11,
    paddingHorizontal: 17,
    borderRadius: 3,
    marginVertical: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  category: {
    // this should be dynamic based on screen width
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 9 - theme.sizes.base) / 2,
    opacity: 0.8,
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: "#FFF",
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "500",
  },
  input: {
    borderBottomColor: "#FFF",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D",
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#34863b",
    opacity: 0.8,
    borderRadius: 16,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default bookingscreen;
