import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import { Form, Field } from "react-final-form";
import styled from "styled-components";
//
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Tabs,
  Tab
} from "@material-ui/core";
//
import { ReturningUserForm, NewUserForm } from "./formFragments";

const StyledForm = styled.form`
  text-align: center;
`;

export class SignInUp extends Component {
  state = {
    isSignedIn: false,
    newUser: false,
    signInOrUp: 0 // sign in = 0, sign up = 1
  };
  handleInOrUpChange = (event, signInOrUp) => {
    console.log("tab", signInOrUp);
    this.setState({ signInOrUp });
  };
  onSubmit = values => {
    console.log("values", values);
  };
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };
  validate = fields => {
    const errors = {};
    if (!fields.email) errors.email = "please enter an email";
    if (!fields.password) errors.password = "please enter a password";
    return errors;
  };
  render() {
    const { open, handleClose } = this.props;
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <Tabs
            value={this.state.signInOrUp}
            onChange={this.handleInOrUpChange}
          >
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>
        </DialogTitle>
        <DialogContent>
          <Grid container justify="center">
            <Form onSubmit={this.onSubmit} validate={this.validate}>
              {({ handleSubmit, pristine, invalid, values }) => {
                return (
                  <StyledForm onSubmit={handleSubmit}>
                    <Grid container justify="center" spacing={8}>
                      {this.state.signInOrUp ? (
                        <NewUserForm />
                      ) : (
                        <ReturningUserForm />
                      )}
                      <Grid item xs={12} />
                    </Grid>
                  </StyledForm>
                );
              }}
            </Form>
            <Grid xs={12} item>
              <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  }
}

const mapState = state => ({
  auth: state.firebase.auth
});
export default compose(
  connect(mapState),
  firestoreConnect()
)(SignInUp);
