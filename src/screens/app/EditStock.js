import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import Fire from "../../api/Fire";

export default class EditStock extends React.Component {
  state = {
    stock: this.props.navigation.state.params.stock,
    id: this.props.navigation.state.params.stock.id,
    quantity: "",
    price: "",
  };

  handelUpdate = () => {
    if (this.state.quantity == "") {
      this.state.quantity = this.props.navigation.state.params.stock.quantity;
    } else if (this.state.price == "") {
      this.state.price = this.props.navigation.state.params.stock.price;
    }
    Fire.shared
      .uploadPost({
        quantity: this.state.quantity.trim(),
        price: this.state.price.trim(),
        id: this.state.id,
      })
      .then((ref) => {
        this.setState({
          quantity: "",
          price: "",
          id: "",
        });
      })
      .catch((error) => {
        alert(error);
      });
    this.props.navigation.navigate("Home");
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.inputTitle}>{this.state.stock.name}</Text>
          </View>
          <View style={{ marginTop: 12 }}>
            <View style={styles.form}>
              <View style={{ marginTop: 12 }}>
                <View style={{ marginTop: 32 }}>
                  <Text style={styles.inputTitle}>Quantity </Text>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={(quantity) => this.setState({ quantity })}
                    value={this.state.quantity}
                    placeholder={this.state.stock.quantity}
                    keyboardType={"numeric"}
                  ></TextInput>
                </View>
                <View style={{ marginTop: 32 }}>
                  <Text style={styles.inputTitle}>Price</Text>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={(price) => this.setState({ price })}
                    value={this.state.price}
                    placeholder={this.state.stock.price}
                    keyboardType={"numeric"}
                  ></TextInput>
                </View>
                <View style={{ marginTop: 32 }}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={this.handelUpdate}
                  >
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>
                      Update Stock
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: "#000000",
    fontSize: 15,
    textTransform: "uppercase",
  },
  input: {
    borderBottomColor: "#000000",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D",
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#6b8e23",
    borderRadius: 40,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
});
