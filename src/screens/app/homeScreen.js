import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
  LayoutAnimation,
} from "react-native";

import { Card, Badge, Block, Caption } from "../../components";
import { theme } from "../../other";
import { Ionicons } from "@expo/vector-icons";

import * as firebase from "firebase";
import Fire from "../../api/Fire";

const { width } = Dimensions.get("window");

export default class Home extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  state = {
    email: "",
    displayName: "",
    phoneNumber: "",
  };

  componentDidMount() {
    const displayName = Fire.shared.getName;
    this.setState({ displayName });
    console.log(displayName);
    console.log("a");
  }

  signOutUser = () => {
    firebase.auth().signOut();
  };
  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <ImageBackground
        style={styles.img}
        source={require("../../../assets/images/homeBackground.jpg")}
      >
        <View style={{ flex: 1, marginTop: 120 }}>
          <Block>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ paddingVertical: theme.sizes.base * 2 }}
            >
              <Block flex={false} row space="between" style={styles.categories}>
                <TouchableOpacity
                  underlayColor="transparent"
                  onPress={() => this.props.navigation.navigate("AddProducts")}
                  style={{ marginBottom: 10, marginRight: 10 }}
                >
                  <Card center middle shadow style={styles.category}>
                    <Badge margin={[0, 0, 15]} size={0}>
                      <Image
                        source={require("../../../assets/icons/addProducts.png")}
                      />
                    </Badge>
                    <Caption medium height={50}>
                      Add Products
                    </Caption>
                  </Card>
                </TouchableOpacity>
                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={() => this.props.navigation.navigate("OrderHome")}
                  style={{ marginBottom: 10 }}
                >
                  <Card center middle shadow style={styles.category}>
                    <Badge margin={[0, 0, 15]} size={50}>
                      <Image
                        source={require("../../../assets/icons/orders.png")}
                      />
                    </Badge>
                    <Caption medium height={50}>
                      My Orders
                    </Caption>
                  </Card>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={() => this.props.navigation.navigate("Market")}
                >
                  <Card center middle shadow style={styles.category}>
                    <Badge margin={[0, 0, 15]} size={50}>
                      <Image
                        source={require("../../../assets/icons/market.png")}
                      />
                    </Badge>
                    <Caption medium height={50}>
                      View Market
                    </Caption>
                  </Card>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={() => this.props.navigation.navigate("DriverList")}
                >
                  <Card center middle shadow style={styles.category}>
                    <Badge margin={[0, 0, 15]} size={50}>
                      <Image
                        source={require("../../../assets/icons/callDriver.png")}
                      />
                    </Badge>
                    <Caption medium height={50}>
                      Call Driver
                    </Caption>
                  </Card>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={() => this.props.navigation.navigate("AddMyDetails")}
                >
                  <Card center middle shadow style={styles.category}>
                    <Badge margin={[0, 0, 15]} size={20}>
                      <Image
                        source={require("../../../assets/icons/details.png")}
                      />
                    </Badge>
                    <Caption medium height={50}>
                      Farming Details
                    </Caption>
                  </Card>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={() => this.props.navigation.navigate("OverviewHome")}
                >
                  <Card center middle shadow style={styles.category}>
                    <Badge margin={[0, 0, 15]} size={50}>
                      <Image
                        source={require("../../../assets/icons/overview.png")}
                      />
                    </Badge>
                    <Caption medium height={50}>
                      Overview
                    </Caption>
                  </Card>
                </TouchableHighlight>
              </Block>
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={this.signOutUser}>
              <Ionicons name="ios-log-out" size={42} color="#b80000"></Ionicons>
            </TouchableOpacity>
          </Block>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  img: {
    flex: 1,
  },
  itm: {
    color: "white",
    padding: 16,
    marginTop: 16,
    borderColor: "green",
    borderWidth: 5,
    borderStyle: "dashed",
    borderRadius: 20,
  },
  category: {
    // this should be dynamic based on screen width
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    opacity: 0.8,
  },
  categories: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  button: {
    marginLeft: 300,
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
});
