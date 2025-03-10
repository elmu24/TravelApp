import React, { useContext, useEffect, useState } from "react";
import { 
  View, 
  FlatList, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  Pressable,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import FirestoreController from '../services/FirestoreController';
import { MaterialIcons } from '@expo/vector-icons';

const LocationsScreen = ({ navigation }) => {
  // Getting current authenticated user 
  const { user } = useContext(AuthContext);
  //Storing list of locations
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (!user) return;

    const handleError = (error) => {
      Alert.alert("Error", "Failed to load locations");
    };
    
    const unsubscribe = FirestoreController.subscribeToUserLocations(
      user.uid,
      setLocations,
      handleError
    );
    
    return () => unsubscribe();
  }, [user]);

  const handleLocationPress = (location) => {
    navigation.navigate('Map', { 
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
        name: location.name,
        description: location.description
      }
    });
  };

  const handleDelete = async (itemId) => {
    Alert.alert(
      "Delete Location",
      "Are you sure you want to delete this location?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: async () => {
            try {
              await FirestoreController.deleteLocation(itemId);
            } catch (error) {
              Alert.alert("Error", "Failed to delete location");
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
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
                <View style={styles.footerRight}>
                  <Text style={styles.date}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </Text>
                  <TouchableOpacity 
                    onPress={() => handleDelete(item.id)}
                    style={styles.deleteButton}
                  >
                    <MaterialIcons name="delete" size={24} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Add these new styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center'
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
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
  },
  footerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  deleteButton: {
    padding: 5
  }
});

export default LocationsScreen;
