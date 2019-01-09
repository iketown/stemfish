import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import rootReducer from "./reducers";
import firebase from "firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";

// const createStoreWithFirebase = compose(
//   reactReduxFirebase(firebase, rrfConfig),
//   reduxFirestore(firebase)
// )(createStore);

export default function configureStore(initialState = {}, history) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(/* other middleware can go here */))
  );
}
