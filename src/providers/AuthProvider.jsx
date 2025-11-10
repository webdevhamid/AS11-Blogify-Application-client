import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../config/firebase-config";
import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
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

  // Google Provider
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  //   Logout function
  const handleLogout = () => {
    return signOut(auth);
  };

  // Update User's profile
  const updateUserProfile = (firstName, lastName, photoURL) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: `${firstName} ${lastName}`,
      photoURL: `${photoURL}`,
    });
  };

  useEffect(() => {
    //   Current user observer
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // Check if the current user email exist
      if (currentUser?.email) {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/jwt`,
          {
            email: currentUser?.email,
          },
          {
            withCredentials: true,
          }
        );
        console.log(data);
      }
    });

    // Cleanup function to stop listening when the component unmount
    return () => {
      // Stop the listener when the component unmount
      return unsubscribe();
    };
  }, []);

  console.log(user);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    handleSignIn,
    handleSignUp,
    handleLogout,
    updateUserProfile,
    handleGoogleSignIn,
  };
  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
