import React, { Component } from "react";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
//
import { Button } from "@material-ui/core";
//
import SignInUp from "./ui/SignInUp.jsx";
export class Home extends Component {
  render() {
    return (
      <div>
        <h3>home</h3>
        <SignInUp />
        <Button variant="contained" color="primary">
          Hi there
        </Button>
      </div>
    );
  }
}
const mapState = state => ({
  songs: state.firestore.data.songs
});
export default compose(
  connect(mapState),
  firestoreConnect([{ collection: "songs" }])
)(Home);
