import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Button, TextField, Grid, Link } from "@mui/material";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  form: {
    marginTop: theme.spacing(3),
  },
  button: {
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
  socialMedia: {
    marginTop: theme.spacing(3),
    "& a": {
      margin: theme.spacing(1),
      color: "#2E3B55",
      transition: "color 0.3s ease-in-out",
      "&:hover": {
        color: "#FFC107",
      },
    },
  },
}));

function ContactUs() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          We’d Love to Hear from You!
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          We value your privacy. Your information will not be shared with third parties. We aim to respond to all inquiries within 48 hours.
        </Typography>
        <form className={classes.form} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="First Name"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="Last Name"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Email"
                type="email"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Message"
                multiline
                rows={4}
                required
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            className={classes.button}
          >
            Send Message
          </Button>
        </form>
        <div className={classes.socialMedia}>
          <Typography variant="body1" gutterBottom>
            Follow us on:
          </Typography>
          <Link href="https://www.facebook.com" target="_blank">
            <FaFacebook size={30} />
          </Link>
          <Link href="https://www.twitter.com" target="_blank">
            <FaTwitter size={30} />
          </Link>
          <Link href="https://www.instagram.com" target="_blank">
            <FaInstagram size={30} />
          </Link>
          <Link href="https://www.linkedin.com" target="_blank">
            <FaLinkedin size={30} />
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default ContactUs;
