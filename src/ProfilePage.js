import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Box, Stack, Typography, TextField, Alert } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Confetti from "react-confetti";
import { auth } from "./firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut, deleteUser } from "firebase/auth";
import { doc, getDoc, setDoc, deleteDoc, query, where, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase-config";
import { useNavigate } from "react-router-dom";
import isValidPostalCode from "./components/zipcode.js";
import "./FoodPantryProfile.css";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [description, setDescription] = useState("");
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);
  const [confettiOn, setConfettiOn] = useState(false);
  const [isPantry, setIsFoodPantry] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    const deleteRequests = async (id) => {
      let q = null;
      const requestsRef = collection(db, "requests");
      if (user && !isPantry) {
        q = query(requestsRef, where("clientUID", "==", id));
      } else if (user && isPantry) {
        q = query(requestsRef, where("foodPantryUID", "==", id));
      }
      if (q) {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (requestDoc) => {
          await deleteDoc(doc(db, "requests", requestDoc.id));
        });
      }
    };

    try {
      const id = user?.uid;
      await deleteUser(user);
      setConfettiOn(true);
      handleCloseAreYouSure();
      let docRef = doc(db, isPantry ? "food-bank-accounts" : "client-accounts", id);
      await deleteDoc(docRef);
      if (isPantry) {
        docRef = doc(db, "inventory", id);
        await deleteDoc(docRef);
      }
      await deleteRequests(id);
      logout();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleSaveChanges = () => {
    setErrorMessage("");
    const docRef = doc(db, isPantry ? "food-bank-accounts" : "client-accounts", user.uid);
    if (!isValidPostalCode(zipcode)) {
      setErrorMessage("Please enter a valid zipcode");
      return;
    }
    setDoc(docRef, { zipcode, description }, { merge: true });
    setConfettiOn(true);
  };

  const logout = () => {
    signOut(auth);
    navigate("/login");
  };

  const handleOpenAreYouSure = () => {
    setDeleteAccountOpen(true);
  };

  const handleCloseAreYouSure = () => {
    setDeleteAccountOpen(false);
  };

  useEffect(() => {
    if (user) {
      const getName = async () => {
        let docRef = doc(db, "client-accounts", user.uid);
        let docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setName(docSnap.data().full_name || "");
          setUsername(docSnap.data().username || "");
          setPassword(docSnap.data().password || "");
          setZipcode(docSnap.data().zipcode || "");
          setIsFoodPantry(false);
        } else {
          docRef = doc(db, "food-bank-accounts", user.uid);
          docSnap = await getDoc(docRef);
          setName(docSnap.data().name || "");
          setUsername(docSnap.data().username || "");
          setPassword(docSnap.data().password || "");
          setZipcode(docSnap.data().zipcode || "");
          setDescription(docSnap.data().description || "");
          setIsFoodPantry(true);
        }
      };
      getName();
    }
  }, [user]);

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        {name}
      </Typography>
      <UserInfo
        username={username}
        password={password}
        zipcode={zipcode}
        description={description}
        setUsername={setUsername}
        setPassword={setPassword}
        setZipcode={setZipcode}
        setDescription={setDescription}
        isPantry={isPantry}
      />
      <Box
        textAlign="center"
        margin="auto"
        style={{ width: "50vw", maxWidth: '500px' }}
      >
        <Stack spacing={2}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginBottom: "16px" }}
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginBottom: "16px" }}
            onClick={logout}
          >
            Log Out
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleOpenAreYouSure}
          >
            Delete Account
          </Button>
        </Stack>
      </Box>
      {errorMessage && (
        <Alert
          sx={{
            width: "50%",
            margin: "auto",
            marginTop: "1rem",
          }}
          severity="error"
        >
          {errorMessage}
        </Alert>
      )}
      <AreYouSureDialog
        deleteAccountOpen={deleteAccountOpen}
        deleteAccount={handleDeleteAccount}
        handleClose={handleCloseAreYouSure}
      />
      <ConfettiMode
        confettiOn={confettiOn}
        setConfettiOn={setConfettiOn}
      />
    </>
  );
}

function UserInfo({
  username,
  password,
  zipcode,
  description,
  setUsername,
  setPassword,
  setZipcode,
  setDescription,
  isPantry,
}) {
  return (
    <Stack
      spacing={3}
      marginTop={1}
      alignItems="center"
      sx={{
        width: '100%',
        maxWidth: '500px',
        margin: 'auto',
        padding: '20px',
        border: '2px solid #ddd',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      }}
    >
      <TextField
        label="Username"
        value={username}
        InputProps={{ readOnly: true }}
        variant="outlined"
        fullWidth
        sx={{ marginBottom: '16px' }}
      />
      <TextField
        label="Password"
        type="password"
        value={password ? "*".repeat(password.length) : ""}
        InputProps={{ readOnly: true }}
        variant="outlined"
        fullWidth
        sx={{ marginBottom: '16px' }}
      />
      <TextField
        label="Zipcode"
        value={zipcode}
        onChange={(e) => setZipcode(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ marginBottom: '16px' }}
      />
      {isPantry && (
        <TextField
          label="Description"
          multiline
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '16px' }}
        />
      )}
    </Stack>
  );
}

function AreYouSureDialog({ deleteAccountOpen, deleteAccount, handleClose }) {
  return (
    <Dialog open={deleteAccountOpen} onClose={handleClose}>
      <DialogTitle>Delete Account Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete your account? All of your information will be lost permanently.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={deleteAccount} color="error">
          Delete Account
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

const ConfettiMode = ({ confettiOn, setConfettiOn }) => {
  return (
    <Confetti
      numberOfPieces={confettiOn ? 200 : 0}
      recycle={false}
      wind={0.05}
      gravity={2}
      onConfettiComplete={(confetti) => {
        setConfettiOn(false);
        confetti.reset();
      }}
    />
  );
};
