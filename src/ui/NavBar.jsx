import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
//
import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
//
import SignInUp from "./SignInUp";

const styles = {
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    flexGrow: 1,
    fontSize: 24
  }
};

class NavBar extends Component {
  state = {
    signInOpen: false
  };

  handleSignInOpen = () => {
    this.setState({ signInOpen: true });
  };
  handleSignOut = () => {
    const { firebase } = this.props;
    firebase.auth().signOut();
  };

  handleSignInClose = () => {
    this.setState({ signInOpen: false });
  };
  componentDidUpdate() {}
  render() {
    const { classes } = this.props;
    const { displayName, email, isEmpty, isLoaded } = this.props.auth;
    const loggedIn = isLoaded && !isEmpty;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.title}>
              StemFish
            </Typography>
            {displayName && <Button color="inherit">{displayName}</Button>}
            {loggedIn ? (
              <>
                <Button component={Link} to="/songs" color="inherit">
                  my songs
                </Button>
                <Button color="inherit" onClick={this.handleSignOut}>
                  sign out
                </Button>
              </>
            ) : (
              <Button color="inherit" onClick={this.handleSignInOpen}>
                sign in
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <SignInUp
          open={this.state.signInOpen}
          handleClose={this.handleSignInClose}
        />
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapState = state => ({
  auth: state.firebase.auth
});

export default compose(
  withStyles(styles),
  connect(mapState),
  firestoreConnect()
)(NavBar);
