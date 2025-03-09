import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Pressable } from 'react-native';  // 使用 Pressable 替代 TouchableOpacity
import { AuthContext } from "../context/AuthContext";
import BottomTabNavigator from "./BottomTabNavigator";
import LoginScreen from "../screens/LoginScreen";
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#8A9FD4', // Light blue-purple color
          },
          headerTintColor: '#fff', // White text
          headerTitleStyle: {
            color: '#fff',
          },
        }}
      >
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} />
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
