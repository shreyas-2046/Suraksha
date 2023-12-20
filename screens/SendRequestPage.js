import { FontAwesome } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import { useEffect } from "react";
import React, { useState } from "react";
import {
  TextInput,
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
const SendRequestPage = () => {
  const [resource, setResource] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState(null);
  const route = useRoute();
  const ToRequestAgency = route.params?.objectId || "No Id found";
  const RequestingAgency = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const AgencyData = useSelector((state) => state.auth.token);
  const [resourcelist, setResourceList] = useState({});

  const fetchLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log("Location", currentLocation);
    } catch (error) {
      console.error("Location fetching error:", error.message);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);
  const resourceTypes = [
    { value: "Food", label: "Food" },
    { value: "Medical Supplies", label: "Medical Supplies" },
    { value: "Equipment", label: "Equipment" },
    // Add other resources as needed
  ];

  const sendRequest = async () => {
    try {
      const jsonData = {
        selectedAgencyId: ToRequestAgency,
        userId: RequestingAgency.agency._id,
        lat: 0,
        lng: 0,
        resource: resourcelist,
      };
      console.log(
        "printing the data",
        ToRequestAgency,
        " ",
        RequestingAgency.agency._id,
        " ",
        resourcelist
      );
      const response = await axios.post(
        "https://tiny-pink-binturong-tutu.cyclic.app/api/v1/auth/send-request",
        jsonData
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const resetFields = () => {
    setResource("");
    setQuantity("");
    setResourceList({});
  };

  useEffect(() => {
    setResourceList({
      name: [resource],
      quantity: [parseInt(quantity)],
    });
  }, [resource, quantity]);
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
      <View style={styles.requestContainer}>
        <Text style={{ fontWeight: "bold" }}>Send a Request</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Resource needed"
            value={resource}
            onChangeText={(text) => setResource(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            value={quantity}
            onChangeText={(text) => setQuantity(text)}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.sendButton} onPress={sendRequest}>
              <Text style={styles.buttonText}>Send Request</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={resetFields}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

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
  requestContainer: {
    display: "flex",
    marginTop: "20%",
    padding: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    width: "100%",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: "15%",
  },
  sendButton: {
    backgroundColor: "#FC5B28",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    marginRight: "2%",
  },
  cancelButton: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  mapIcon: {
    marginTop: 20,
  },
});

export default SendRequestPage;
