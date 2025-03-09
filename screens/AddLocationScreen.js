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
import StyledButton from '../components/StyledButton';

// Adding location , save data to firestore for user 
const AddLocationScreen = ({ navigation }) => {
  // get user from authContext
  const { user } = useContext(AuthContext);
  // state Location name textfiels
  const [name, setName] = useState("");
  // state  location description field
  const [description, setDescription] = useState("");
  // state for rating
  const [rating, setRating] = useState(0);

  // for clearing inputs after pressing save-button and dismisses keyboard
  const clearInputs = () => {
    setName("");
    setDescription("");
    setRating(0);
    Keyboard.dismiss();
  };

  // Handling new added locations
  const handleAddLocation = async () => {
    // validating if all the fields are filled - if not -> error message
    if (!name || !description || !rating) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
  
    // get location data to be saved in firestore
    const locationData = {
      name,
      description,
      rating,
      // associate location with a user
      userEmail: user.email
    };
  
    // Calling Firestore function to add location
    const result = await FirestoreController.addLocation(user.uid, locationData);
    
    if (result.success) {
      // address clearinputs component
      clearInputs();
      Alert.alert("Success", "Location added successfully!", [
        {
          // Navigate to the LocationsScreen
          text: "OK",
          onPress: () => navigation.navigate("Locations")
        }
      ]);
    } else {
      // show error message if firestore connection doesn't work
      Alert.alert("Error", result.error);
    }
  };

  // Layout elements
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
        <StyledButton 
          title="Add Location" 
          onPress={handleAddLocation}  
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

// Style
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
