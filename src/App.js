import React, { Component } from "react";

import withRoot from "./ui/withRoot";
// post bootstrap
import NavBar from "./ui/NavBar";
export class App extends Component {
  render() {
    return (
      <>
        <NavBar />
      </>
    );
  }
}

export default withRoot(App);
