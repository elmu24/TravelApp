import React from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
  // Default location (e.g., Helsinki)
  const defaultLocation = {
    latitude: 60.1699,
    longitude: 24.9384,
    name: "Default Location"
  };

  // Use route params if available, otherwise use default
  const location = route.params?.location || defaultLocation;

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        }}
      >
        <Marker 
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude
          }}
          title={location.name}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  }
});

export default MapScreen;
