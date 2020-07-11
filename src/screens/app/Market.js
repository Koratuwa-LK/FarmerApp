import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
} from "react-native";
import Fire from "../../api/Fire";
import axios from "../../../axioslist";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

export default class Market extends React.Component {
  state = {
    myStocks: [],
    price: "",
  };

  componentDidMount() {
    const uid = Fire.shared.uid;
    axios
      .get("Stocks.json")
      .then((response) => {
        const myStocks = [];
        const obj = response.data;
        for (let key in obj) {
          if (obj[key].uid == uid) {
            myStocks.push({
              id: key,
              name: obj[key].crop,
              economicCenter: obj[key].economicCenter,
              price: obj[key].price,
              quantity: obj[key].quantity,
              image: obj[key].image,
              timestamp: obj[key].timestamp,
            });
          }
        }
        this.setState({
          myStocks: myStocks,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  catch(err) {
    console.log(err);
  }

  renderStocks = (stock) => {
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
              <Text style={styles.name}>{stock.name}</Text>
              <Text style={styles.timestamp}>
                {moment(stock.timestamp).fromNow()}
              </Text>
            </View>
            <Ionicons name="ios-contact" size={24} color="#73788B"></Ionicons>
          </View>
          <Text style={styles.data}>Price(Kg) : Rs.{stock.price}</Text>
          <Text style={styles.data}>Quantity : {stock.quantity}Kg</Text>
          <Text style={styles.data}>
            Economic Center : {stock.economicCenter}
          </Text>
          <Image
            style={styles.postImage
            }
            source={{ uri: stock.image }}
            resizeMode="cover"
          ></Image>
          <View style={{ flexDirection: "row-reverse" }}>
            <TouchableHighlight
              style={{ marginTop: 8 }}
              onPress={() => this.openTwoButtonAlert(stock.id)}
            >
              <View>
                <Ionicons size={24} color="#ac0732" name="ios-trash" />
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ marginTop: 8 }}
              onPress={() =>
                this.props.navigation.navigate("EditStock", {
                  stock,
                })
              }
            >
              <Ionicons
                style={{ marginRight: 25 }}
                size={24}
                color="#0c0e8d"
                name="md-create"
              />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  };

  deleteStock = (id) => {
    Fire.shared
      .deletePost({ id })
      .then((ref) => {
        this.props.navigation.navigate("Home");
      })
      .catch((error) => {
        alert(error);
      });
  };

  openTwoButtonAlert = (id) => {
    Alert.alert(
      "Delete Stock",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => this.deleteStock(id) },
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
  refreshPage = () => {
    window.location.reload(false);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Stocks</Text>
        </View>
        <FlatList
          style={styles.feed}
          data={this.state.myStocks}
          renderItem={({ item }) => this.renderStocks(item)}
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
