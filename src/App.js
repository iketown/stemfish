import React, { Component } from "react";
import "./App.css";
import createStore from "./createStore";
import firebase from "firebase";
import "firebase/database";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
//
import Home from "./Home.jsx";
const fbConfig = {
  apiKey: process.env.REACT_APP_GOOG_FB_API_KEY,
  authDomain: "stem-fish.firebaseapp.com",
  databaseURL: "https://stem-fish.firebaseio.com",
  projectId: "stem-fish",
  storageBucket: "",
  messagingSenderId: "660682103360"
};

try {
  firebase.initializeApp(fbConfig);
  const firestore = firebase.firestore();
  firestore.settings({ timestampsInSnapshots: true });
} catch (err) {}

const store = createStore();
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Home />
        </ReactReduxFirebaseProvider>
      </Provider>
    );

    // return (
    //   <Provider store={store}>
    //     <ReactReduxFirebaseProvider {...rrfProps}>
    //       <Home />
    //     </ReactReduxFirebaseProvider>
    //   </Provider>
    // );
  }
}

export default App;
