import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../config/firebase-config";
import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //    Sign-In Function
  const handleSignIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //  Signup function
  const handleSignUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   Logout function
  const handleLogout = () => {
    return signOut(auth);
  };

  // Update User's profile
  const updateUserProfile = (firstName, lastName, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: `${firstName} ${lastName}`,
      photoURL: `${photoURL}`,
    });
  };
  //   Current user observer
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log(user);
      } else {
        console.log("User is logged out");
      }
    });
  }, [user]);

  const authInfo = {
    user,
    setUser,
    handleSignIn,
    handleSignUp,
    handleLogout,
    updateUserProfile,
  };
  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
