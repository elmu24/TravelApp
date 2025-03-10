import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";

// LoginScreen component for user authentication
const LoginScreen = () => {
  // State empty variables for email and password input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Get Login function from AuthContext
  const { login } = useContext(AuthContext);

   // Handling Login process
  const handleLogin = async () => {

    if (!email || !password) {
      // Error if fields empty
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      Alert.alert("Login Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Layout
  return (
    <View style={styles.container}>

      {/* Login headline and field*/ }
      <Text>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* passwort field */}
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {/* Login button */}
      <Button 
        title={isLoading ? "Logging in..." : "Login"} 
        onPress={handleLogin}
        disabled={isLoading}
      />
    </View>
  );
};

// Styles 
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { borderWidth: 1, marginVertical: 10, padding: 10, width: "100%" },
});

export default LoginScreen;
