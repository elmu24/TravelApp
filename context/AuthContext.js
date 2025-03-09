import React, { createContext, useState, useEffect } from "react";
import { auth } from "../services/firebaseConfig";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Creating athcontext to manage auth state globally
export const AuthContext = createContext();

// Creating Component for auth users 
export const AuthProvider = ({ children }) => {
  // State to store authenticated user
  const [user, setUser] = useState(null);

  // Effect Hook: Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // Set the user state
      setUser(user);
      if (user) {
        // Save user data local
        await AsyncStorage.setItem("user", JSON.stringify(user));
      } else {
        // or remove when logged out
        await AsyncStorage.removeItem("user");
      }
    });
    return unsubscribe;
  }, []);

  // Retrieving stored user data  and restores session
  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error loading user:', error);
      }
    };
    // calling the function
    loadUser();
  }, []);

  // Login function w. asynch storage
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await AsyncStorage.setItem('user', JSON.stringify(userCredential.user));
      setUser(userCredential.user);
    } catch (error) {
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    // Remove stored user data 
    await signOut(auth);
  };

  // Provide authentication state and functions -> for child components
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
