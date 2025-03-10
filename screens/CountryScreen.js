import React, { useState } from "react";
import { View, Text, TextInput, FlatList, Image, StyleSheet } from "react-native";
import axios from "axios";

// search for countries and capitals, fetches data from restcountries.com- API
// Displays also Capital, Country and flag.
const CountryScreen = () => {
  //  State to store user search input
  const [query, setQuery] = useState("");
  // State to store filtered country results
  const [countries, setCountries] = useState([]);

  // Handles countrysearch
  const searchCountries = async (text) => {
    // Update query state
    setQuery(text);
    if (text.length < 2) {
      // Clear results if input is too short
      setCountries([]);
      return;
    }

    try {
      // Fetch countries from the API
      const response = await axios.get(`https://restcountries.com/v3.1/all`);
       // Filter countries matching the input text 
      const filtered = response.data.filter(country =>
        country.name.common.toLowerCase().includes(text.toLowerCase()) ||
        (country.capital && country.capital[0].toLowerCase().includes(text.toLowerCase()))
      );
      // Update state with filtered countries
      setCountries(filtered);
    } catch (error) {
      // Log API errors
      console.error("Error fetching countries", error);  
    }
  };

  return (
    <View style={styles.container}>
      {/* Search input field */}
      <TextInput
        style={styles.input}
        placeholder="Search country or capital..."
        value={query}
        // Calls search function when text changes
        onChangeText={searchCountries} 
      />

      {/* Display list of matching countries */}
      <FlatList
        data={countries}
        // Unique country code as key
        keyExtractor={(item) => item.cca3} 
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.flags.png }} style={styles.flag} />
            <Text>{item.name.common} - Capital: {item.capital?.[0]}</Text>
          </View>
        )}
      />
    </View>
  );
};


// Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  searchInput: {
    height: 50,  
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16  
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20, 
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10  
  },
  countryInfo: {
    flex: 1,
    marginLeft: 15
  },
  countryName: {
    fontSize: 18,  
    fontWeight: 'bold',
    marginBottom: 8
  },
  capitalName: {
    fontSize: 16,  
    color: '#666'
  },
  flag: {
    width: 60,  
    height: 40,  
    marginRight: 10
  }
});
export default CountryScreen;
