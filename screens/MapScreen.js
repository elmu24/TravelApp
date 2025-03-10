import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

// displaying a map with a selected location marker.
const MapScreen = ({ route }) => {
  // storing the selected location
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Retrieve the location passed via navigation route
  const location = route.params?.location;

  // useEffect hook to update selected location state 
  useEffect(() => {
    if (location) {
      setSelectedLocation({
        latitude: location.latitude || 0,
        longitude: location.longitude || 0,
        title: location.name,
        description: location.description
      });
    }
    // Runs whenever the 'location' prop changes
  }, [location]);

  // Layout
  return (
    <View style={styles.container}>
      {/* Render MapView component */}
      <MapView
        style={styles.map}
        region={selectedLocation ? {
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        } : {
          latitude: 60.1699,
          longitude: 24.9384,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
         {/* Render a marker if a location is selected */}
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude
            }}
          >
            <View>
              <Text>{selectedLocation.title}</Text>
              <Text>{selectedLocation.description}</Text>
            </View>
          </Marker>
        )}
      </MapView>
    </View>
  );
};

// Style 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;
