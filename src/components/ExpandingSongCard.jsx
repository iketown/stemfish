import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { firebaseConnect, firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";
//
import { fakeSong, getFakePerson } from "../fakes/fakeSong";
import { showMe } from "../helpers/showMe";

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

class ExpandingSongCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes, allTracks, song } = this.props;
    const person = getFakePerson();
    if (!song) return <div>loading. . .</div>;
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar src={person.avatarImg} className={classes.avatar} />}
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={song.title}
          subheader="September 14, 2016"
        />

        {allTracks && (
          <CardContent>
            {Object.entries(allTracks).map(([id, track]) => {
              return <TrackDisplay key={id} track={track} />;
            })}
          </CardContent>
        )}
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>

          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography>expanding stuff</Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

ExpandingSongCard.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapState = (state, props) => ({
  song: state.firestore.data.songs && state.firestore.data.songs[props.songId],
  allTracks: state.firestore.data.tracks
});
export default compose(
  withStyles(styles),
  connect(mapState),
  firestoreConnect(props => [
    {
      collection: "tracks",
      where: [["songId", "==", props.songId]]
    }
  ])
)(ExpandingSongCard);

// VaIuedlYD3fEucMAfRv8cNblsNu1
// songId 001GEVpknZYN7sRf2NYY
// track image https://manual.audacityteam.org/m/images/9/9d/mono_comparison_220.png

// artist:  "userId123"
// contentTitle: "guitar"
// image: "https://manual.audacityteam.org/m/images/9/9d/mono_comparison_220.png"
// songId: "001GEVpknZYN7sRf2NYY"
const TrackBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 80%;
  justify-items: center;
  align-items: center;
  border: 1px dotted navy;
`;
const TrackDisplay = ({ track }) => {
  return (
    <TrackBox>
      {track.contentTitle}
      <img style={{ height: "3rem" }} src={track.image} />
    </TrackBox>
  );
};
