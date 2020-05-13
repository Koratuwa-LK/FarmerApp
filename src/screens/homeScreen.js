import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableHighlight,
  ImageBackground,
} from "react-native";

export default function Home({ navigation }) {
  const pressHandler = () => {
    navigation.navigate("AddProducts");
  };
  return (
    
    <ImageBackground style={styles.img} source={require('../../assets/home.jpg')}>
    <View>
      <View
        style={{
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
          marginTop: 200,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => navigation.navigate('AddProducts')}
            style={{marginRight:50}}
          >
            <View style={{alignContent:"center",alignItems:'center',marginBottom: 50}}>
              <Text style={styles.itm}>Add Products</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => navigation.navigate('MyOrders')}
            style = {{width: '30%'}}
          >
            <View>
            <Text style={styles.itm}>My Orderss</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={{ flexDirection: "row" }}>
        <TouchableHighlight
            underlayColor="transparent"
            onPress={() => navigation.navigate('MyOrders')}
            style={{marginRight:50, width: '30%'}}
          >
            <View>
              <Text style={styles.itm}>View Market</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            //underlayColor="rgba(73,182,77,1,0.9)"
            onPress={pressHandler}
            style={{width: '30%'}}
          >
            <View>
            <Text style={styles.itm}>Get Driver</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    paddingTop: 38,
    backgroundColor: "seagreen",
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  img: {
    flex:1,
  },
  itm: {
    color: 'white',
    padding: 16,
    marginTop: 16,
    borderColor: 'green',
    borderWidth: 5,
    borderStyle: "dashed",
    borderRadius: 20,
  }
});
