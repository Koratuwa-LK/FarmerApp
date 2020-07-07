import FirebaseKeys from "./config";
import firebase from "firebase";
//import { ContentInsetAdjustmentBehavior } from "react-native-webview/lib/WebViewTypes";

class Fire {
    constructor() {
        firebase.initializeApp(FirebaseKeys);
    }

    addLocation = async({ latitude, longitude }) => {
        return new Promise((res, rej) => {
            firebase
                .database()
                .ref("FarmerBookings/")
                .push({
                    latitude,
                    longitude,
                    uid: this.uid,
                    timestamp: this.timestamp,
                })
                .then((ref) => {
                    res(ref);
                })
                .catch((error) => {
                    rej(error);
                });
        });
    };

    get getName() {
        var displayName = "";
        firebase
            .database()
            .ref("Farmers/" + this.uid)
            .on("value", (snap) => {
                displayName = snap.val().name;
            });
        return displayName;
    }

    uploadPost = async({ price, quantity, id }) => {
        console.log(id);
        firebase.database().ref("Stocks/").child(id).update({ price, quantity });
    };

    deletePost = async({ id }) => {
        console.log(id);
        firebase
            .database()
            .ref("Stocks/" + id)
            .remove();
    };

    get firestore() {
        return firebase.firestore();
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get getPhoneNum() {
        return (firebase.auth().currentUser || {}).phoneNumber;
    }

    get timestamp() {
        return Date.now();
    }
}

Fire.shared = new Fire();
export default Fire;