import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Card from "../utils/Card";
const HomePage = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    // Here, you can perform actions with the searchValue state
    console.log("Search Value:", searchValue);
    // Example: Perform axios request or any other operation
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            source={require("../assets/AppLogo.png")}
            style={styles.logo}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.title}>5BN NDRF</Text>
          <Text style={styles.subtitle}>MAVAL, Sudumbre, Maharashtra</Text>
        </View>
        <TouchableOpacity>
          <Image
            source={require("../assets/hamBurgerIcon.png")}
            style={styles.ham}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={searchValue}
          onChangeText={(text) => setSearchValue(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/*cards to be mapped below */}
      <Card />
      <Card />
      <Card />
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 45,
    paddingHorizontal: 10, // Add some padding for space
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "cover",
  },
  ham: {
    width: 40,
    height: 40,
    resizeMode: "cover",
  },
  textContainer: {
    marginLeft: 5, // Adjust as needed for spacing between logo and text
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 5, // Add margin for space between the title and subtitle
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#FC5B28",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
