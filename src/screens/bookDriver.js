import React, { Component, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableHighlight,
  Image,
} from "react-native";
import { Button } from "react-native-paper";
import TimePicker from "react-native-24h-timepicker";
import axios from "../../axioslist";

import { Card, Badge, Block, Caption } from "../components";
import { theme } from "../other";

const { width } = Dimensions.get("window");

class bookingscreen extends Component {
  state = {
    time: "",
    name: "tony",
    link: {
      uri: "",
    },
  };

  componentDidMount() {
    this.setState({
      link: {
        uri: "/drivers/" + this.props.navigation.getParam("name") + "/.json",
      },
    });
  }

  /* checkout() {
      // axios.patch('/drivers/' + this.props.navigation.getParam('name') + '/.json' , {time: this.state.time, booking: {lat : this.props.navigation.getParam('lat'), lng: this.props.navigation.getParam('lng')}})
      axios.patch('/drivers/' + this.props.navigation.getParam('name') + '/.json', {booking: {time: this.state.time, lat: this.props.navigation.getParam('lat'), lng: this.props.navigation.getParam('lng')}})
      .then(response => {
        console.log(response)
      }).catch(err => {
        console.log(err)
      })
    } */

  checkout() {
    // axios.patch('/drivers/' + this.props.navigation.getParam('name') + '/.json' , {time: this.state.time, booking: {lat : this.props.navigation.getParam('lat'), lng: this.props.navigation.getParam('lng')}})
    axios
      .post("/farmerbookings.json", {
        farmername: "farmer_1",
        drivername: this.props.navigation.getParam("name"),
        farmernumer: "011698080",
        time: this.state.time,
        lat: this.props.navigation.getParam("lat"),
        lng: this.props.navigation.getParam("lng"),
      })
      .then((response) => {
        console.log(response);
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
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../../assets/images/driverScreen1.jpg")}
      >
        <View style={styles.container}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => this.TimePicker.open()}
          >
            <Card center middle shadow style={styles.category}>
              <Badge margin={[0, 0, 15]} size={50} color="transparent">
                <Image source={require("../../assets/icons/clock.png")} />
              </Badge>
              <Caption medium height={50}>
                Pickup Time
              </Caption>
            </Card>
          </TouchableHighlight>
          <Text style={styles.text}>{this.state.time}</Text>
          <TimePicker
            ref={(ref) => {
              this.TimePicker = ref;
            }}
            onCancel={() => this.onCancel()}
            onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
          />
          <Text>{this.props.navigation.getParam("lat")}</Text>
          <Text>{this.props.navigation.getParam("lng")}</Text>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => {
              this.checkout();
            }}
          >
            <Card center middle shadow style={styles.category}>
              <Badge margin={[0, 0, 15]} size={50} color="transparent">
                <Image source={require("../../assets/icons/bookDriver.png")} />
              </Badge>
              <Caption medium height={50}>
                Book Now
              </Caption>
            </Card>
          </TouchableHighlight>
          <Text>{this.props.navigation.getParam("name")}</Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 200,
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
});

export default bookingscreen;
