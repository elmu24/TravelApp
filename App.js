import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import React from "react";
import { AuthProvider } from "./context/AuthContext";
import AppNavigator from "./navigation/AppNavigator"; 

// App component  with Authprovider and navigation component
const App = () => {
  return (
    <AuthProvider>
      <AppNavigator />
      <StatusBar style="auto" />
    </AuthProvider>
  );
};

export default App;

