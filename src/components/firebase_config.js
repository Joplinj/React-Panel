import firebase from "firebase";
require("firebase/firestore");

var config = {
  apiKey: "AIzaSyABZ-3poQVgwI7k4tiGjf5-5EMUuvrHItI",
  authDomain: "tribin-17173.firebaseapp.com",
  databaseURL: "https://tribin-17173.firebaseio.com",
  projectId: "tribin-17173",
  storageBucket: "tribin-17173.appspot.com",
  messagingSenderId: "1084262078439"
};

firebase.initializeApp(config);

const firestore = firebase.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

export {db};
