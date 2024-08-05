import { React, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { db } from "./firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Stack,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Alert,
  useTheme
} from "@mui/material";
import isValidPostalCode from "./components/zipcode";

export default function Login() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerFullName, setRegisterFullName] = useState("");
  const [registerZipcode, setRegisterZipcode] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isPantry, setIsPantry] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const theme = useTheme();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [user, loading]);

  const register = async () => {
    try {
      if (!isValidPostalCode(registerZipcode)) {
        setErrorMessage("Please enter a valid zipcode");
        return;
      }
      const user = await createUserWithEmailAndPassword(
        auth,
        registerUsername.includes("@")
          ? registerUsername
          : registerUsername + "@func.com",
        registerPassword
      );
      let path = "client-accounts";
      if (isPantry) {
        path = "food-bank-accounts";
      }
      const dbRef = doc(db, path, user.user.uid);
      const insertUser = async () => {
        if (!isPantry) {
          await setDoc(dbRef, {
            full_name: registerFullName,
            password: registerPassword,
            username: registerUsername,
            zipcode: registerZipcode,
            description: "",
          });
        } else {
          await setDoc(dbRef, {
            name: registerFullName,
            password: registerPassword,
            username: registerUsername,
            zipcode: registerZipcode,
            description: "",
          });
          const dbRef2 = doc(db, "inventory", user.user.uid);
          await setDoc(dbRef2, {
            "Pantry UID": user.user.uid,
            itemList: [],
            quantityList: [],
            wantedItemList: [],
            wantedQuantityList: [],
          });
        }
      };
      insertUser();
      navigate("/");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const login = async () => {
    try {
      if (loginUsername.includes("@")) {
        const user = await signInWithEmailAndPassword(
          auth,
          loginUsername,
          loginPassword
        );
      } else {
        const user = await signInWithEmailAndPassword(
          auth,
          loginUsername + "@func.com",
          loginPassword
        );
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const logout = () => {
    signOut(auth);
  };

  return (
    <>
      {!registerOpen && (
        <Stack
          className="center"
          spacing={3}
          alignItems="center"
          justifyContent="center"
          sx={{
            width: '100%',
            maxWidth: '400px',
            margin: 'auto',
            padding: '20px',
            border: `2px solid ${theme.palette.divider}`,
            borderRadius: '12px',
            boxShadow: `0 4px 8px ${theme.palette.action.disabled}`,
          }}
        >
          <Typography variant="h5" margin={3}>
            Sign In to an Existing Account
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            onChange={(event) => {
              setLoginUsername(event.target.value);
              setErrorMessage("");
            }}
            fullWidth
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            onChange={(event) => {
              setLoginPassword(event.target.value);
              setErrorMessage("");
            }}
            fullWidth
            sx={{ marginBottom: '16px' }}
          />
          <Button
            variant="contained"
            onClick={login}
            sx={{
              width: '100%',
              marginBottom: '16px',
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Sign In
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setRegisterOpen(!registerOpen);
              setErrorMessage("");
            }}
            sx={{
              width: '100%',
              marginBottom: '16px',
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            Sign Up
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/account-recovery")}
            sx={{
              width: '100%',
              marginBottom: '16px',
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            Reset Password
          </Button>
          {errorMessage && (
            <Alert
              severity="error"
              sx={{ width: '100%' }}
            >
              {errorMessage}
            </Alert>
          )}
        </Stack>
      )}

      {registerOpen && (
        <Stack
          className="center"
          spacing={3}
          alignItems="center"
          justifyContent="center"
          sx={{
            width: '100%',
            maxWidth: '400px',
            margin: 'auto',
            padding: '20px',
            border: `2px solid ${theme.palette.divider}`,
            borderRadius: '12px',
            boxShadow: `0 4px 8px ${theme.palette.action.disabled}`,
          }}
        >
          <Typography variant="h5" margin={3}>
            Register an Account
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            onChange={(event) => {
              setRegisterUsername(event.target.value);
              setErrorMessage("");
            }}
            fullWidth
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            onChange={(event) => {
              setRegisterPassword(event.target.value);
              setErrorMessage("");
            }}
            fullWidth
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            label="Full Name"
            variant="outlined"
            onChange={(event) => {
              setRegisterFullName(event.target.value);
              setErrorMessage("");
            }}
            fullWidth
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            label="Zipcode"
            variant="outlined"
            onChange={(event) => {
              setRegisterZipcode(event.target.value);
              setErrorMessage("");
            }}
            fullWidth
            sx={{ marginBottom: '16px' }}
          />
          <FormControlLabel
            control={
              <Checkbox
                id="isPantry"
                onChange={() => {
                  setIsPantry(!isPantry);
                  setErrorMessage("");
                }}
              />
            }
            label="Affiliation?"
            sx={{ marginBottom: '16px' }}
          />
          {errorMessage && (
            <Alert
              severity="error"
              sx={{ width: '100%' }}
            >
              {errorMessage}
            </Alert>
          )}
          <Button
            variant="contained"
            onClick={register}
            sx={{
              width: '100%',
              marginBottom: '16px',
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Create User
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setRegisterOpen(!registerOpen);
              setErrorMessage("");
            }}
            sx={{
              width: '100%',
              marginBottom: '16px',
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            Return to Sign In
          </Button>
        </Stack>
      )}
    </>
  );
}
