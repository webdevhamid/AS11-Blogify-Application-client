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
  const [loading, setLoading] = useState(true);

  //    Sign-In Function
  const handleSignIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //  Signup function
  const handleSignUp = (email, password) => {
    setLoading(true);
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

  useEffect(() => {
    //   Current user observer
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
        console.log(user);
      } else {
        console.log("User is logged out");
        setLoading(false);
      }
    });

    // Cleanup function to stop listening when the component unmount
    return () => {
      // Stop the listener when the component unmount
      unsubscribe();
    };
  }, [user]);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    handleSignIn,
    handleSignUp,
    handleLogout,
    updateUserProfile,
  };
  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
