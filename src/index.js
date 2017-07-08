import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyBFst0KH4hxxdiU7ADQd09NMW_7oPh9RTI",
  authDomain: "wastetracker-5daf7.firebaseapp.com",
  databaseURL: "https://wastetracker-5daf7.firebaseio.com",
  projectId: "wastetracker-5daf7",
  storageBucket: "wastetracker-5daf7.appspot.com",
  messagingSenderId: "39773773466"
};
const app = firebase.initializeApp(config);

render(<App />, document.getElementById("root"));
