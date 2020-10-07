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

  addDetails = async ({ crop, quantity, district, landSize, year }) => {
    return new Promise((res, rej) => {
      firebase
        .database()
        .ref("CropDetails/")
        .push({
          crop,
          district,
          quantity,
          landSize,
          phoneNum: this.getPhoneNum,
          name: this.getName,
          uid: this.uid,
          timestamp: this.timestamp,
          year: year,
        })
        .then((ref) => {
          res(ref);
        })
        .catch((error) => {
          rej(error);
        });
    });
  };

    addPost = async ({ crop, quantity, price, economicCenter, localUri }) => {
    const remoteUri = await this.uploadPhotoAsync(localUri);
    return new Promise((res, rej) => {
      firebase
        .database()
        .ref("Stocks/")
        .push({
          crop,
          economicCenter,
          quantity,
          price,
          phoneNum: this.getPhoneNum,
          name: this.getName,
          uid: this.uid,
          timestamp: this.timestamp,
          image: remoteUri,
        })
        .then((ref) => {
          res(ref);
        })
        .catch((error) => {
          rej(error);
        });
    });
    };

    uploadPhotoAsync = async (uri) => {
      const path = `photos/${this.uid}/${Date.now()}.jpg`;
      return new Promise(async (res, rej) => {
        const response = await fetch(uri);
        const file = await response.blob();
  
        let upload = firebase.storage().ref(path).put(file);

        upload.on(
          "state_changed",
          (snapshot) => {},
          (err) => {
            rej(err);
          },
          async () => {
            const url = await upload.snapshot.ref.getDownloadURL();

            res(url);
          }
        );
      });
     };

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

    acptOrdr = async ({ id }) => {
      console.log(id);
      firebase.database().ref("orders/").child(id).update({ Accept: true });
    };

    cmptOrdr = async ({ id }) => {
      console.log(id);
      firebase.database().ref("orders/").child(id).update({ CompleteOrder: true });
    };

    rjctOrdr = async ({ id }) => {
      console.log(id);
      firebase.database().ref("orders/").child(id).update({ Reject: true });
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
