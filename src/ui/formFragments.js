import React from "react";
import { Grid, Button, withStyles } from "@material-ui/core";
//
import TextInput from "./TextInput.jsx";

const SubmitButton = ({ text }) => (
  <Button mt={2} variant="contained" color="primary" type="submit" size="small">
    {text}
  </Button>
);

export const NewUserForm = () => (
  <Grid item container spacing={16}>
    <Grid xs={12} item>
      <TextInput name="email" label="Email" placeholder="me@example.io" />
    </Grid>
    <Grid xs={12} item>
      <TextInput name="password" label="Password" password />
    </Grid>
    <Grid xs={12} item>
      <TextInput name="firstName" label="First Name" />
    </Grid>
    <Grid xs={12} item>
      <TextInput name="lastName" label="Last Name" />
    </Grid>
    <Grid xs={12} item>
      <SubmitButton text="Sign Up" />
    </Grid>
  </Grid>
);

export const ReturningUserForm = ({ setToNew }) => (
  <Grid justify="center" item container spacing={16}>
    <Grid xs={12} item>
      <TextInput name="email" label="Email" placeholder="me@example.io" />
    </Grid>
    <Grid xs={12} item>
      <TextInput name="password" label="password" password />
    </Grid>
    <Grid xs={12} item>
      <SubmitButton text="Sign In" />
    </Grid>{" "}
    <Grid xs={12} item>
      <Button color="primary" size="small" onClick={setToNew}>
        New User ?
      </Button>
    </Grid>
  </Grid>
);
