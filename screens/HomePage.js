import React, { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setNearby } from "../slices/nearbySlice";
import * as Location from "expo-location";
import Card from "../utils/Card";
import { ScrollView } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const agencyTypes = [
  { value: "Fire-Brigade", label: "Fire-Brigade" },
  { value: "Hospital", label: "Hospital" },
  { value: "Police", label: "Police" },
  { value: "CRPF", label: "CRPF" },
  { value: "NDRF", label: "NDRF" },
  { value: "SRPF", label: "SRPF" },
  { value: "Army", label: "Army" },
];

const HomePage = ({ navigation }) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [location, setLocation] = useState(null);
  const [selectedAgencyType, setSelectedAgencyType] = useState(null);
  const [Nearby, setNearbyAgencies] = useState([]);
  const AgencyData = useSelector((state) => state.auth.token);
  const [NearbyData, setNearbyData] = useState(
    useSelector((state) => state.nearby.nearby)
  );
  const removeData = async () => {
    try {
      await AsyncStorage.removeItem("key");

      console.log("Data removed successfully!");

      navigation.navigate("FillLoginPage");
    } catch (error) {
      console.error("Error removing data:", error);
    }
  };
  const handleSearch = () => {
    // console.log("Search Value:", searchValue);
    // console.log("Selected Agency Type:", selectedAgencyType);
    // fetchData();
    // Filter the data based on the selected agency type
    const filteredNearby = NearbyData.filter(
      (item) => item.agencyType === selectedAgencyType
    );
    // console.log("filtered agency is " , filteredNearby)
    // Set the filtered data to state
    setNearbyAgencies(filteredNearby);
    setNearbyData(Nearby);
    // Call the API with the filtered data
    // fetchData();
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
    fetchData();
  }, [location, selectedAgencyType]);

  useEffect(() => {
    fetchNearbyData();
  }, []);

  const fetchNearbyData = async () => {
    const response = await axios.post(
      "https://tiny-pink-binturong-tutu.cyclic.app/api/v1/auth/get-nearby",
      {
        lat: location?.coords?.latitude || 0,
        lng: location?.coords?.longitude || 0,
        // filter: selectedAgencyType, // Use the selected agency type directly
      }
    );

    // console.log("API Response:", response.data);

    setNearbyAgencies(response.data.nearby);
    dispatch(setNearby(response.data.nearby));
  };
  const fetchData = async () => {
    try {
      if (selectedAgencyType === null) {
        console.log("Please select an agency type");
        return;
      }

      const response = await axios.post(
        "https://tiny-pink-binturong-tutu.cyclic.app/api/v1/auth/get-nearby",
        {
          lat: location?.coords?.latitude || 0,
          lng: location?.coords?.longitude || 0,
          // filter: selectedAgencyType, // Use the selected agency type directly
        }
      );

      // console.log("API Response:", response.data);
      dispatch(setNearby(response.data.nearby));
      setNearbyAgencies(response.data.nearby);
      dispatch(setNearbyData(response.data.nearby));
    } catch (error) {
      console.error("Error fetching nearby data:", error);
    }
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
          <Text style={styles.title}>{AgencyData.agency.name}</Text>
          <Text style={styles.subtitle}>{AgencyData.agency.address}</Text>
        </View>

        <TouchableOpacity onPress={removeData}>
          <Image
            source={require("../assets/hamBurgerIcon.png")}
            style={styles.ham}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <RNPickerSelect
          onValueChange={(value) => setSelectedAgencyType(value)}
          items={agencyTypes}
          placeholder={{ label: "Select Agency Type", value: null }}
          style={pickerSelectStyles}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      <ScrollView style={styles.cardContainer}>
        {Array.isArray(Nearby) && Nearby.length > 0 ? (
          Nearby.map((item) => <Card key={item._id } data={item} />)
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
    paddingHorizontal: 10,
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
    marginLeft: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 5,
  },
  searchContainer: {
    backgroundColor: "white",
    fontWeight: "bold",
    marginVertical: 10,
    borderRadius: 7,
    borderWidth: 1, // Add border width
    width: 200,
    height: 50,
    marginLeft: 50,
    marginTop: 1,
  },
  button: {
    backgroundColor: "#FC5B28",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "black",
    paddingRight: 30,
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "black",
    paddingRight: 30,
    marginBottom: 10,
  },
});
