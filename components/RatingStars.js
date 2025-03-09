import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Star rating component to rate 1-5 Stars
const RatingStars = ({ rating, onRatingChange }) => {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          // calling onRatingChange function with the selected start value
          onPress={() => onRatingChange(star)}
        >
          <Ionicons
          // style of the stars icon
            name={star <= rating ? 'star' : 'star-outline'}
            size={30}
            color={star <= rating ? '#FFD700' : '#ccc'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

// style for the whole component
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  }
});

export default RatingStars;