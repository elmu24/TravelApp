import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LocationsScreen from "../screens/LocationsScreen";
import AddLocationScreen from "../screens/AddLocationScreen";
import MapScreen from "../screens/MapScreen";
import CountryScreen from "../screens/CountryScreen";
import { Ionicons } from '@expo/vector-icons';  

// Create Component for navigation menu on the bottom
const Tab = createBottomTabNavigator();

// fill component
const BottomTabNavigator = () => {
  return (
    // style of the navigator
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#8A9FD4',
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.6)',
        headerStyle: {
          backgroundColor: '#A5B5E0',
        },
        headerTintColor: '#fff',
        cardStyle: {
          backgroundColor: '#fff',
        },
        contentStyle: {
          color: '#333', 
        }
      }}
    >

      {/* Locations tab with text and icon*/}
      <Tab.Screen 
        name="Locations" 
        component={LocationsScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'list' : 'list-outline'} size={24} color={color} />
          ),
        }}
      />

       {/* Add Locations tab*/}
      <Tab.Screen 
        name="Add Location" 
        component={AddLocationScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} size={24} color={color} />
          ),
        }}
      />

       {/* Map tab*/}
      <Tab.Screen 
        name="Map" 
        component={MapScreen}
        initialParams={{ location: null }}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'map' : 'map-outline'} size={24} color={color} />
          ),
        }}
      />

       {/* Countires tab*/}
      <Tab.Screen 
        name="Countries" 
        component={CountryScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'earth' : 'earth-outline'} size={24} color={color} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
