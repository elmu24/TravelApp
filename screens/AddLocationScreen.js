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

const AddLocationScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);  // Single rating state for star rating
  
  const handleAddLocation = async () => {
    if (!name || !description || !rating) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "locations"), {
        userId: user.uid,
        name,
        description,
        rating: rating,
        createdAt: new Date().toISOString(),
        latitude: 0,
        longitude: 0
      });
  // Clear all input fields
  setName("");
  setDescription("");
  setRating(0);
  Keyboard.dismiss();
  Alert.alert(
    "Success", 
    "Location added successfully!", 
    [
      {
        text: "OK",
        onPress: () => navigation.navigate("Locations")
      }
    ]
  );
} catch (error) {
  Alert.alert("Error", error.message);
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
