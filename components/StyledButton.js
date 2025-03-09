import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// create button function for uniformed style and behavior of buttons
const StyledButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity 
      style={styles.button}
      //Calling provided function on press
      onPress={onPress}
      // visual effect when pressed
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

// Styles for button
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#A5B5E0',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  }
});

export default StyledButton;