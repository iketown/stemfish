import React, { Component } from "react";
import withRoot from "./ui/withRoot";
import { Switch, BrowserRouter as Router, Route, Link } from "react-router-dom";
//
import NavBar from "./ui/NavBar";
import NewSongForm from "./components/NewSongForm.jsx";
import MySongs from "./components/MySongs.jsx";
export class App extends Component {
  render() {
    return (
      <>
        <Router>
          <>
            <NavBar />
            <Switch>
              <Route path="/songs/new" component={NewSongForm} />
              <Route path="/songs" component={MySongs} />
            </Switch>
          </>
        </Router>
      </>
    );
  }
}

export default withRoot(App);
