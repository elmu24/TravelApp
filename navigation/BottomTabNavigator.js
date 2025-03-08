import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LocationsScreen from "../screens/LocationsScreen";
import AddLocationScreen from "../screens/AddLocationScreen";
import MapScreen from "../screens/MapScreen";
import CountryScreen from "../screens/CountryScreen";
import { Ionicons } from '@expo/vector-icons';  // 添加分号

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Locations') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Add Location') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Countries') {
            iconName = focused ? 'earth' : 'earth-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Locations" component={LocationsScreen} />
      <Tab.Screen name="Add Location" component={AddLocationScreen} />
      <Tab.Screen 
        name="Map" 
        component={MapScreen}
        initialParams={{ location: null }}
      />
      <Tab.Screen name="Countries" component={CountryScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
