import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Button, Box } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  formContainer: {
    border: "2px solid #ccc", // Border color
    borderRadius: "8px", // Rounded corners
    padding: theme.spacing(4), // Padding inside the border
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Shadow effect
    maxWidth: "400px", // Max width for a more square-like look
    margin: "auto",
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

function ForgotPassword() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container className={classes.formContainer}>
        <Typography variant="h4" gutterBottom>
          Forgot Password?
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
        Contact us via email
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          href="mailto:tafadzwa.murah@gmail.com"
          className={classes.button}
        >
          Email Us
        </Button>
        <Typography variant="body1" align="center" gutterBottom>
        We value your privacy. Your information will not be shared with third parties. We aim to respond to all inquiries within 48 hours.
        </Typography>
      </Container>
    </div>
  );
}

export default ForgotPassword;
