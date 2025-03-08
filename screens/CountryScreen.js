import React, { useState } from "react";
import { View, Text, TextInput, FlatList, Image, StyleSheet } from "react-native";
import axios from "axios";

const CountryScreen = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);

  const searchCountries = async (text) => {
    setQuery(text);
    if (text.length < 2) {
      setCountries([]);
      return;
    }

    try {
      const response = await axios.get(`https://restcountries.com/v3.1/all`);
      const filtered = response.data.filter(country =>
        country.name.common.toLowerCase().includes(text.toLowerCase()) ||
        (country.capital && country.capital[0].toLowerCase().includes(text.toLowerCase()))
      );
      setCountries(filtered);
    } catch (error) {
      console.error("Error fetching countries", error);  // Changed from German to English
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search country or capital..."
        value={query}
        onChangeText={searchCountries}
      />
      <FlatList
        data={countries}
        keyExtractor={(item) => item.cca3}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.flags.png }} style={styles.flag} />
            <Text>{item.name.common} - Capital: {item.capital?.[0]}</Text>  // Changed from "Hauptstadt" to "Capital"
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  searchInput: {
    height: 50,  // Increased height
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16  // Larger font size
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,  // Increased padding
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10  // Added margin between items
  },
  countryInfo: {
    flex: 1,
    marginLeft: 15
  },
  countryName: {
    fontSize: 18,  // Larger font size
    fontWeight: 'bold',
    marginBottom: 8
  },
  capitalName: {
    fontSize: 16,  // Larger font size
    color: '#666'
  },
  flag: {
    width: 60,  // Larger flag
    height: 40,  // Larger flag
    marginRight: 10
  }
});
export default CountryScreen;
