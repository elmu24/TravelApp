import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Pressable } from 'react-native';  
import { AuthContext } from "../context/AuthContext";
import BottomTabNavigator from "./BottomTabNavigator";
import LoginScreen from "../screens/LoginScreen";
import { Ionicons } from '@expo/vector-icons';

// create stack navigator component
const Stack = createStackNavigator();


// Creating navigation -> login screen -> menu
const AppNavigator = () => {
  // Get user state and logout function from AuthContext
  const { user, logout } = useContext(AuthContext);

  // Layout and Sytle
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#8A9FD4', 
          },
          headerTintColor: '#fff', 
          headerTitleStyle: {
            color: '#fff',
          },
        }}
      >
        {/* If the user is NOT logged in, show the LoginScreen */}
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} />
          // If the user is logged in, show the main app with the logout button
        ) : (
          <Stack.Screen 
            name="MainApp" 
            component={BottomTabNavigator}
            options={{
              headerRight: () => (
                <Pressable 
                  onPress={logout}
                  style={{ marginRight: 15 }}
                >
                  <Ionicons name="log-out-outline" size={24} color="white" />
                </Pressable>
              )
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
