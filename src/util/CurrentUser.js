import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
//

const CurrentUser = () => {
  return <div />;
};

const mapState = ({ firebase, firestore }) => ({
  auth: firebase.auth
});
export default compose(
  connect(mapState),
  firestoreConnect(props => {
    if (!props.auth.uid) {
      console.log("nope");
      return [];
    }
    console.log("yep");
    return [
      { collection: "users", doc: props.auth.uid },
      { collection: "songs", where: [["adminId", "==", props.auth.uid]] }
    ];
  })
)(CurrentUser);
