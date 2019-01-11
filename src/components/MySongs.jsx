import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import ExpandingSongCard from "./ExpandingSongCard";

export class MySongs extends Component {
  render() {
    const { songs } = this.props;
    if (!songs) return "loading . . .";
    return <ExpandingSongCard songId="001GEVpknZYN7sRf2NYY" />;
  }
}
const mapState = state => ({
  songs: state.firestore.ordered && state.firestore.ordered.songs
});
export default compose(connect(mapState))(MySongs);
