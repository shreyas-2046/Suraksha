import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setNearby } from "../slices/nearbySlice";

import * as Location from "expo-location";

import Card from "../utils/Card";
import { ScrollView } from "react-native";
const HomePage = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [location, setLocation] = useState(null);
  const [Nearby, setNearbyAgencies] = useState([]);
  const AgencyData = useSelector((state) => state.auth.token);
  const NearbyData = useSelector((state) => state.nearby.nearby);
  console.log("Nearby Data in redux", NearbyData);
  // console.log("Agency Data",AgencyData);
  const handleSearch = () => {
    // Here, you can perform actions with the searchValue state
    console.log("Search Value:", searchValue);
  };
  const fetchLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    } catch (error) {
      console.error("Location fetching error:", error.message);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    // console.log("Location", location);
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make HTTP request to the specified endpoint
        const response = await axios.post(
          "http://192.168.13.223:4000/api/v1/auth/get-nearby",
          {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          }
        );

        // Store the result in the nearby state
        setNearbyAgencies(response.data.nearby);
        dispatch(setNearby(response.data.nearby));
        // console.log('Nearby data:', response.data.nearby);
      } catch (error) {
        console.error("Error fetching nearby data:", error);
        // Handle errors as needed
      }
    };

    // Call the function when the component mounts
    fetchData();
  }, [location]);
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
          <Text style={styles.title}>{AgencyData.agency.name}</Text>
          <Text style={styles.subtitle}>{AgencyData.agency.address}</Text>
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
      <ScrollView style={styles.cardContainer}>
        {Array.isArray(NearbyData) && NearbyData.length > 0 ? (
          NearbyData.map((item, index) => <Card key={index} data={item} />)
        ) : (
          <Text>No nearby agencies found</Text>
        )}
      </ScrollView>
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
  cardContainer: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 10,
  },
});
