import React from "react";
import { Typography, Grid, Button } from "@material-ui/core";
//
import TextInput from "./TextInput.jsx";

const SubmitButton = ({ text }) => (
  <Button mt={2} variant="contained" color="primary" type="submit" size="small">
    {text}
  </Button>
);

export const NewUserForm = () => (
  <>
    <Grid container item xs={12} sm={6}>
      <Grid xs={12} item>
        <TextInput name="email" label="Email" placeholder="me@example.io" />
      </Grid>
      <Grid xs={12} item>
        <TextInput name="password" label="password" password />
      </Grid>
    </Grid>
    <Grid container item xs={12} sm={6}>
      <Grid xs={12} item>
        <TextInput name="firstName" label="First Name" />
      </Grid>
      <Grid xs={12} item>
        <TextInput name="last" label="Last Name" />
      </Grid>
    </Grid>
    <Grid container item xs={12} sm={6}>
      <Grid xs={12} item>
        <SubmitButton text="Sign Up" />
      </Grid>
    </Grid>
  </>
);

export const ReturningUserForm = () => (
  <>
    <Typography>
      <Grid xs={12} item>
        <TextInput name="email" label="Email" placeholder="me@example.io" />
      </Grid>
      <Grid xs={12} item>
        <TextInput name="password" label="password" password />
      </Grid>
      <Grid xs={12} item>
        <SubmitButton text="Sign In" />
      </Grid>
    </Typography>
  </>
);
