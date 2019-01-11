import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";
import { Form, Field } from "react-final-form";
import ExpandingSongCard from "./ExpandingSongCard";
export class NewSongForm extends Component {
  render() {
    return <ExpandingSongCard songId="001GEVpknZYN7sRf2NYY" />;
  }
}

export default NewSongForm;
