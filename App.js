import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import React from "react";
import { AuthProvider } from "./context/AuthContext";
import AppNavigator from "./navigation/AppNavigator"; // Fix capitalization

const App = () => {
  return (
    <AuthProvider>
      <AppNavigator />
      <StatusBar style="auto" />
    </AuthProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
