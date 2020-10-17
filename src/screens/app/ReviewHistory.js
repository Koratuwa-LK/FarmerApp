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

export default class ReviewHistory extends React.Component {
  state = {
    myReviews: [],
    price: "",
  };

  componentDidMount() {
    const uid = Fire.shared.uid;
    axios.get("Farmers.json").then((response) => {
      const myReviews = [];
      const obj = response.data;

      for (let key in obj) {
        if (key == uid) {
          //console.log(obj[key].FarmerId);
          const riv = obj[key].reviews;
          console.log(riv);
          for (let key1 in riv) {
            myReviews.push({
              id: key1,
              buyerName: riv[key1].name,
              comment: riv[key1].comment,
              rating: riv[key1].rating,
            });
          }
        }
      }
      this.setState({
        myReviews: myReviews,
      });
    });
  }

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
            </View>
            <Ionicons name="ios-contact" size={24} color="#73788B"></Ionicons>
          </View>
          <Text style={styles.data}>Comment : {order.comment}</Text>
          <Text style={styles.data}>Rating : {order.rating}/5</Text>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Reviews</Text>
        </View>
        <FlatList
          style={styles.feed}
          data={this.state.myReviews}
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
