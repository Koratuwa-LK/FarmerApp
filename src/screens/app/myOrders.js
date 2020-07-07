import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  Alert,
} from "react-native";
import axios from "../../../axioslist";
import Fire from "../../api/Fire";
import { Ionicons } from "@expo/vector-icons";

export default class myOrders extends React.Component {
  state = {
    myOrders: [],
    price: "",
  };

  componentDidMount() {
    const uid = Fire.shared.uid;
    axios.get("orders.json").then((response) => {
      const myOrders = [];
      const obj = response.data;

      for (let key in obj) {
        if (
          obj[key].FarmerId == uid &&
          obj[key].Accept == false &&
          obj[key].Reject == false
        ) {
          myOrders.push({
            id: key,
            buyerName: obj[key].Buyer,
            crop: obj[key].Crop,
            price: obj[key].DesiredPrice,
            quantity: obj[key].Quantity,
            orderDate: obj[key].OrderDate,
            economicCenter: obj[key].economicCenter,
            mobileNum: obj[key].Mobile,
          });
        }
      }
      this.setState({
        myOrders: myOrders,
      });
    });
  }

  acceptAlert = (id) => {
    Alert.alert(
      "Accept Order",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => this.acceptOrder(id) },
        {
          text: "No",
          onPress: () => console.log("No item was removed"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  acceptOrder = (id) => {
    Fire.shared
      .acptOrdr({ id })
      .then((ref) => {
        this.props.navigation.navigate("Home");
      })
      .catch((error) => {
        alert(error);
      });
  };

  rejectAlert = (id) => {
    Alert.alert(
      "Reject Order",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => this.rejectOrder(id) },
        {
          text: "No",
          onPress: () => console.log("No item was removed"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  rejectOrder = (id) => {
    Fire.shared
      .rjctOrdr({ id })
      .then((ref) => {
        this.props.navigation.navigate("Home");
      })
      .catch((error) => {
        alert(error);
      });
  };

  renderOrders = (order) => {
    return (
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
              <Text style={styles.name}>{order.buyerName}</Text>
              <Text style={styles.timestamp}>{order.orderDate}</Text>
            </View>
            <Ionicons name="ios-contact" size={24} color="#73788B"></Ionicons>
          </View>
          <Text style={styles.data}>Mobile Number : {order.mobileNum}</Text>
          <Text style={styles.data}>Crop : {order.crop}</Text>
          <Text style={styles.data}>Desired Price(Kg) : Rs.{order.price}</Text>
          <Text style={styles.data}>Quantity : {order.quantity}Kg</Text>
          <Text style={styles.data}>
            Economic Center : {order.economicCenter}
          </Text>
          <View style={{ flexDirection: "row-reverse" }}>
            <TouchableHighlight
              style={{ marginTop: 8 }}
              onPress={() => this.rejectAlert(order.id)}
            >
              <View>
                <Ionicons size={28} color="#ac0732" name="ios-close-circle" />
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ marginTop: 8, marginRight: 16 }}
              onPress={() => this.acceptAlert(order.id)}
            >
              <View>
                <Ionicons
                  size={28}
                  color="#6b8e23"
                  name="ios-checkmark-circle"
                />
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Orders</Text>
        </View>
        <FlatList
          style={styles.feed}
          data={this.state.myOrders}
          renderItem={({ item }) => this.renderOrders(item)}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        ></FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#448e47",
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
  feed: {
    marginHorizontal: 16,
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
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4,
  },
  data: {
    fontSize: 12,
    marginTop: 16,
    fontWeight: "500",
    color: "#03512a",
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
  },
});
