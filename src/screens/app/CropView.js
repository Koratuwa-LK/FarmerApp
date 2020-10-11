import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
} from "react-native";
import axios from "../../../axioslist";
import Fire from "../../api/Fire";

class CropView extends Component {
  state = {
    crop: "",
    district: "",
    cropList: [],
  };

  componentDidMount() {
    this.setState({
      crop: this.props.navigation.getParam("crop"),
      district: this.props.navigation.getParam("economicCenter"),
    });
    axios.get("CropDetails.json").then((response) => {
      const cropList = [];
      const obj = response.data;

      for (let key in obj) {
        //console.log(this.state.district);
        if (
          obj[key].district == this.state.district ||
          obj[key].crop == this.state.crop
        ) {
          cropList.push({
            id: key,
            farmerName: obj[key].name,
            crop: obj[key].crop,
            landsize: obj[key].landSize,
            district: obj[key].district,
            quantity: obj[key].quantity,
            year: obj[key].year,
          });
        }
      }
      this.setState({
        cropList: cropList,
      });
      console.log(this.state.cropList);
    });
  }

  renderCrops = (crop) => {
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
              <Text style={styles.name}>{crop.farmerName}</Text>
              <Text style={styles.timestamp}>{crop.year}</Text>
            </View>
          </View>
          <Text style={styles.data}>Crop : {crop.crop}</Text>
          <Text style={styles.data}>Quantity : {crop.quantity}Kg</Text>
          <Text style={styles.data}>District : {crop.district}</Text>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Overview</Text>
        </View>
        <FlatList
          style={styles.feed}
          data={this.state.cropList}
          renderItem={({ item }) => this.renderCrops(item)}
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

export default CropView;
