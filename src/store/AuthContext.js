import { create } from "zustand";
import { auth } from "../firebase/firebase.config.js";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export const useAuthStore = create((set) => ({
  currentUser: null,
  loading: true,
  error: null,

  initAuth: () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      let userData = null;

      if (user) {
        userData = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          phoneNumber: user.phoneNumber,
          providerData: user.providerData, // Array of sign-in methods
        };
      }

      set({ currentUser: userData, loading: false });
    });

    return unsubscribe;
  },

  //create a new user and storing it in a property:
  registerUser: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      set({ currentUser: userCredential.user, loading: false });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  loginUser: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      set({ currentUser: userCredential.user, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw new Error(error.message);
    }
  },
  logoutUser: async () => {
    try {
      await signOut(auth);
      set({ currentUser: null });
    } catch (error) {
      set({ error: error.message });
    }
  },

  //   login with google
  signInWithGoogle: async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // The signed-in user info and token are available in result.user
      if (result.user) {
        alert("Login Successful!");
      }
      // You can also access the ID token if you need to use it for other purposes
      const idToken = await user.getIdToken();
      //   console.log("Google ID Token: ", idToken);
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        console.warn("User closed the popup before signing in.");
      } else {
        alert("Failed to sign in with Google, please try again.");
        console.error("Google Sign-in failed:", error.message);
      }
    }
  },
}));
