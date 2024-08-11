import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, Typography, Box } from "@mui/material";
import logo from "./images/pantryaccess.png";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, #2E3B55, #1F2A38)", // Gradient background
    padding: theme.spacing(4),
  },
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Slightly transparent white
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
    textAlign: "center",
    maxWidth: "600px",
    margin: "auto",
  },
  logo: {
    width: 200,
    marginBottom: theme.spacing(3),
    transition: "transform 0.3s ease-in-out",
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  title: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
    fontSize: "2.5rem",
  },
  description: {
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(4),
    fontSize: "1.2rem",
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: "#FFF",
    margin: "10px",
    padding: "10px 20px",
    borderRadius: "8px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

function LandingPage({ viewFoodPantries, setViewFoodPantries }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const redirect = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (user) {
      redirect();
    }
  }, [user]);

  return (
    <div className={classes.root}>
      <Container maxWidth="sm" className={classes.container}>
        <img src="/log.png" alt="StockSmart Logo" className={classes.logo} />
        <Typography variant="h4" className={classes.title}>
          Welcome to StockSmart!
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
        
        
        </Typography>
        <Typography variant="subtitle2" className={classes.description}>
        Transform your kitchen with StockSmart—your smart pantry management app that effortlessly tracks and organizes your inventory.
        </Typography>
        {!viewFoodPantries ? (
          <>
            <Button
              variant="contained"
              className={classes.button}
              onClick={redirect}
            >
              Sign In/Sign Up
            </Button>

          </>
        ) : (
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => setViewFoodPantries(false)}
          >
            Hide Pantries
          </Button>
        )}
        <Button
            variant="contained"
            className={classes.button}
            onClick={() => navigate("/Contact")}
          >
            Contact Us
          </Button>
      </Container>
    </div>
  );
}

export default LandingPage;
