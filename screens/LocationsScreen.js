import React, { useContext, useEffect, useState } from "react";
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { db } from "../services/firebaseConfig";

const LocationsScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "locations"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLocations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, [user]);

  const handleLocationPress = (location) => {
    navigation.navigate('Map', { location });
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
            <Text style={styles.locationName}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>Rating: {item.rating}/5</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  locationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 8
  },
  locationName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4
  }
});

export default LocationsScreen;
