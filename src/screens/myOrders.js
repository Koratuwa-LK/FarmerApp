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
} from "react-native";

import { Card, Badge, Block, Caption } from "../components";
import { theme } from "../other";

const { width } = Dimensions.get("window");

export default function Home({ navigation }) {
  const pressHandler = () => {
    navigation.navigate("AddProducts");
  };
  return (
    <ImageBackground
      style={styles.img}
      source={require("../../assets/home.jpg")}
    >
        
      <Block>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base * 2 }}
        >
          <Block flex={false} row space="between" style={styles.categories}>
            <TouchableOpacity
              underlayColor="transparent"
              onPress={() => navigation.navigate("AddProducts")}
            >
              <Card center middle shadow style={styles.category}>
                <Caption medium height={20}>
                  1
                </Caption>
              </Card>
            </TouchableOpacity>

            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => navigation.navigate("BookDriver")}
            >
              <Card center middle shadow style={styles.category}>
                <Caption medium height={20}>
                  2
                </Caption>
              </Card>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => navigation.navigate("MyOrders")}
            >
              <Card center middle shadow style={styles.category}>
                <Caption medium height={20}>
                  3
                </Caption>
              </Card>
            </TouchableHighlight>

            <TouchableHighlight
              //underlayColor="rgba(73,182,77,1,0.9)"
              onPress={pressHandler}
            >
              <Card center middle shadow style={styles.category}>
                <Caption medium height={20}>
                  4
                </Caption>
              </Card>
            </TouchableHighlight>
          </Block>
        </ScrollView>
      </Block>
    </ImageBackground>
  );
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
  },
  categories: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
});
