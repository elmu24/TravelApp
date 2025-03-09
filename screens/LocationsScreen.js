import React, { useContext, useEffect, useState } from "react";
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { db } from "../services/firebaseConfig";
import FirestoreController from '../services/FirestoreController';

const LocationsScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (!user) return;
    
    const unsubscribe = FirestoreController.subscribeToUserLocations(
      user.uid,
      (locations) => setLocations(locations)
    );
    
    return () => unsubscribe();
  }, [user]);
  
  const handleLocationPress = (location) => {
    if (location.latitude && location.longitude) {
      navigation.navigate('Map', { 
        location: {
          latitude: parseFloat(location.latitude),
          longitude: parseFloat(location.longitude),
          name: location.name,
          description: location.description
        }
      });
    } else {
      Alert.alert("Error", "Location coordinates not available");
    }
  };
  
  return (
    <View style={styles.container}>
      <Button 
        title="Add New Location" 
        onPress={() => navigation.navigate('AddLocation')}
        style={styles.addButton}
      />
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.locationItem}
            onPress={() => handleLocationPress(item)}
          >
            <View style={styles.locationContent}>
              <Text style={styles.locationName}>{item.name}</Text>
              <Text style={styles.locationDescription}>{item.description}</Text>
              <View style={styles.locationFooter}>
                <Text style={styles.rating}>Rating: {item.rating}/5</Text>
                <Text style={styles.date}>
                  {new Date(item.createdAt).toLocaleDateString()}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  addButton: {
    marginBottom: 16
  },
  locationItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  locationContent: {
    flex: 1
  },
  locationName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8
  },
  locationDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8
  },
  locationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8
  },
  rating: {
    fontSize: 14,
    color: '#444'
  },
  date: {
    fontSize: 14,
    color: '#888'
  }
});

export default LocationsScreen;
