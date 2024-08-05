import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./Login";
import React from "react";
import ProfilePage from "./ProfilePage";
import MyRequests from "./PantryMyRequests";
import ClientMyRequests from "./ClientMyRequests";
import PantryHome from "./PantryHome";
import Footer from "./components/Footer";
import ClientHome from "./ClientHome";
import FourOhFour from "./404";
import Welcome from "./Welcome";
import ContactUs from "./ContactUs";
import { auth } from "./firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase-config";
import ForgotPassword from "./ForgotPassword";
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3b9d6e',
    },
    secondary: {
      main: '#547AA5',
    },
    custom: {
      light: '#ffa726',
      main: '#f57c00',
      dark: '#ef6c00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

function App() {
  const [user, loading, error] = useAuthState(auth);
  const [isPantry, setIsPantry] = React.useState(false);
  const [viewFoodPantries, setViewFoodPantries] = React.useState(false);

  // Check if user is a pantry or client
  React.useEffect(() => {
    if (user) {
      const getIsPantry = async () => {
        let docRef = doc(db, "client-accounts", user.uid);
        let docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setIsPantry(false);
        } else {
          setIsPantry(true);
        }
      };
      getIsPantry();
    } else {
      setIsPantry(false);
    }
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div style={{minHeight: "80vh", backgroundColor: "white", paddingBottom: "2rem"}}>
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {user ? (
                    isPantry ? (
                      <PantryHome />
                    ) : (
                      <ClientHome />
                    )
                  ) : (
                    <>
                      <Welcome
                        viewFoodPantries={viewFoodPantries}
                        setViewFoodPantries={setViewFoodPantries}
                      />
                      {viewFoodPantries && <ClientHome />}
                    </>
                  )}
                </>
              }
            />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route
              path="/myrequests"
              element={
                isPantry ? (
                  <MyRequests />
                ) : (
                  <ClientMyRequests />
                )
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/account-recovery" element={<ForgotPassword />} />
            <Route path="*" element={<FourOhFour />} />
          </Routes>
        </div>
        <Footer style={{minHeight: "10vh"}} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
