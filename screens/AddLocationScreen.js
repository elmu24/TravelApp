import React, { useState, useContext } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { db } from "../services/firebaseConfig";
import RatingStars from "../components/RatingStars";
import FirestoreController from '../services/FirestoreController';

const AddLocationScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const clearInputs = () => {
    setName("");
    setDescription("");
    setRating(0);
    Keyboard.dismiss();
  };

  // In your handleAddLocation function:
  const handleAddLocation = async () => {
    if (!name || !description || !rating) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
  
    const locationData = {
      name,
      description,
      rating,
      userEmail: user.email
    };
  
    const result = await FirestoreController.addLocation(user.uid, locationData);
    
    if (result.success) {
      clearInputs();
      Alert.alert("Success", "Location added successfully!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Locations")
        }
      ]);
    } else {
      Alert.alert("Error", result.error);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          multiline
        />
        <Text style={styles.label}>Rating:</Text>
        <RatingStars 
          rating={rating} 
          onRatingChange={setRating}
        />
        <Button title="Add Location" onPress={handleAddLocation} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center'
  }
});

export default AddLocationScreen;
