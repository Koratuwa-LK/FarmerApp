import * as React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as firebase from "firebase";
import FirebaseKeys from "../../api/config";

export default function App() {
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [userName, setUserName] = React.useState();
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined;
  const [message, showMessage] = React.useState(
    !firebaseConfig || Platform.OS === "web"
      ? {
          text:
            "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device.",
        }
      : undefined
  );

  return (
    <View style={styles.container}>
    <View style={styles.form}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={FirebaseKeys}
      />

      {/*  <Image
        source={require("../../../assets/images/login.jpg")}
        style={{ marginTop: -350, marginLeft: -50 }}
      ></Image> */}
      <Image
        source={require("../../../assets/images/logo.png")}
        style={{ marginTop: -10, alignSelf: "center" }}
      ></Image>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ marginTop: 42 }}>
          <Text style={styles.inputTitle}>Enter User Name</Text>
          <TextInput
            style={{
              marginVertical: 10,
              marginBottom: 32,
              fontSize: 17,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
            onChangeText={(userName) => setUserName(userName)}
          />

          <Text style={styles.inputTitle}>Enter phone number</Text>
          <TextInput
            style={{
              marginVertical: 10,
              fontSize: 17,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
            placeholder="phone number"
            autoCompleteType="tel"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            onChangeText={(phoneNumber) => setPhoneNumber("+94" + phoneNumber)}
          />
          <TouchableOpacity
            style={styles.button}
            title="Send Verification Code"
            disabled={!phoneNumber}
            onPress={async () => {
              // The FirebaseRecaptchaVerifierModal ref implements the
              // FirebaseAuthApplicationVerifier interface and can be
              // passed directly to `verifyPhoneNumber`.
              try {
                const phoneProvider = new firebase.auth.PhoneAuthProvider();
                const verificationId = await phoneProvider.verifyPhoneNumber(
                  phoneNumber,
                  recaptchaVerifier.current
                );
                setVerificationId(verificationId);
                showMessage({
                  text: "Verification code has been sent to your phone.",
                });
              } catch (err) {
                showMessage({ text: `Error: ${err.message}`, color: "red" });
              }
            }}
          >
            <Text style={{ color: "#FFF", fontWeight: "500" }}>
              Send Verification Code
            </Text>
          </TouchableOpacity>
          <View style={{ marginTop: 42 }}>
            <Text style={styles.inputTitle}>Enter Verification code</Text>
            <TextInput
              style={{
                marginVertical: 10,
                fontSize: 17,
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
              editable={!!verificationId}
              placeholder="123456"
              onChangeText={setVerificationCode}
            />
            <TouchableOpacity
              style={styles.button}
              title="Confirm Verification Code"
              disabled={!verificationId}
              onPress={async () => {
                try {
                  const credential = firebase.auth.PhoneAuthProvider.credential(
                    verificationId,
                    verificationCode
                  );
                  await firebase.auth().signInWithCredential(credential);
                  const uid = (firebase.auth().currentUser || {}).uid;
                  await firebase
                    .database()
                    .ref("Farmers/" + uid)
                    .set({ name: userName, uid: uid });
                  showMessage({ text: "Phone authentication successful 👍" });
                } catch (err) {
                  showMessage({ text: `Error: ${err.message}`, color: "red" });
                }
              }}
            >
              <Text style={{ color: "#FFF", fontWeight: "500" }}>
                Confirm and LogIn
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {message ? (
        <TouchableOpacity
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 0xffffffee, justifyContent: "center" },
          ]}
          onPress={() => showMessage(undefined)}
        >
          <Text
            style={{
              color: message.color || "blue",
              fontSize: 17,
              textAlign: "center",
              margin: 20,
            }}
          >
            {message.text}
          </Text>
        </TouchableOpacity>
      ) : undefined}
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputTitle: {
    color: "#232823",
    fontSize: 14,
    textTransform: "uppercase",
  },
  container: {
    flex: 1,
    backgroundColor: "#88b18b",
  },
  input: {
    borderBottomColor: "#232823",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D",
  },
  form: {
    flex: 1,
    marginTop: 45,
    marginBottom: 48,
    marginHorizontal: 30,
    backgroundColor: "#88b18b",
  },
  button: {
    marginTop: 32,
    marginHorizontal: 30,
    backgroundColor: "#6b8e23",
    borderRadius: 40,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
});
