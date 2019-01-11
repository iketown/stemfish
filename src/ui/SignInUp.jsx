import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import { Form, Field } from "react-final-form";
import styled from "styled-components";
import Swiper from "react-swipeable-views";
//
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Tabs,
  Tab,
  withStyles,
  Typography
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
    signInOrUp: 1, // signIn = 1.  up=0
    errorMessage: null
  };
  handleInOrUpChange = (event, signInOrUp) => {
    this.setState({ signInOrUp });
  };
  onSubmit = values => {
    const signUpBool = this.state.signInOrUp === 0;
    if (signUpBool) {
      this.signUp(values);
    } else {
      this.signIn(values);
    }
  };
  signIn = values => {
    const { email, password } = values;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.signInUpSuccess)
      .catch(({ message, code }) => {
        this.setState({ errorMessage: message });
      });
  };
  signUp = values => {
    const { email, password, firstName, lastName } = values;
    firebase
      .createUser({ email, password }, { firstName, lastName, email })
      .catch(({ message, code }) => {
        if (code === "auth/email-already-in-use") {
          this.signIn(values).catch(err => {
            this.setState({
              errorMessage: "That account already exists.   Sign in ?",
              signInOrUp: 1
            });
          });
        } else {
          this.setState({ errorMessage: message });
        }
      });
  };
  signInUpSuccess = () => {
    console.log("s u success called");
    this.props.handleClose();
  };
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: this.signInUpSuccess
    }
  };
  validate = fields => {
    const errors = {};
    if (!fields.email) errors.email = "please enter an email";
    if (!fields.password) errors.password = "please enter a password";
    return errors;
  };
  render() {
    const { open, handleClose, classes } = this.props;
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">
          <Tabs
            value={this.state.signInOrUp}
            onChange={this.handleInOrUpChange}
          >
            <Tab label="Sign Up" />
            <Tab label="Sign In" />
          </Tabs>
        </DialogTitle>
        <DialogContent>
          <Form onSubmit={this.onSubmit} validate={this.validate}>
            {({ handleSubmit, pristine, invalid, values }) => {
              return (
                <StyledForm onSubmit={handleSubmit}>
                  <Typography color="error">
                    {this.state.errorMessage}
                  </Typography>
                  <Grid container justify="center" spacing={8}>
                    <Swiper
                      index={this.state.signInOrUp}
                      onChangeIndex={i => this.handleInOrUpChange(null, i)}
                    >
                      <NewUserForm />
                      <ReturningUserForm
                        setToNew={() => this.handleInOrUpChange(null, 0)}
                      />
                    </Swiper>
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
        </DialogContent>
      </Dialog>
    );
  }
}

const styles = {
  signUpButton: { marginTop: "3rem" }
};

const mapState = state => ({
  auth: state.firebase.auth
});
export default compose(
  withStyles(styles),
  connect(mapState),
  firestoreConnect()
)(SignInUp);
