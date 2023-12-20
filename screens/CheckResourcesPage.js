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
import { ScrollView } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const CheckResourcesPage = () => {
  const AgencyData = useSelector((state) => state.auth.token);

  // Accessing resources from AgencyData
  const names = AgencyData.agency.resources.name || [];
  const quantities = AgencyData.agency.resources.quantity || [];

  console.log(names);
  console.log(quantities);

  // Check if names and quantities are arrays before generating cards
  if (!Array.isArray(names) || !Array.isArray(quantities)) {
    return (
      <View>
        <Text>No resources available</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ marginTop: "5%" }}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            source={require("../assets/AppLogo.png")}
            style={styles.logo}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.title}>5BN NDRF</Text>
          <Text style={styles.subtitle}>Inventory Page</Text>
        </View>
        <TouchableOpacity>
          <Image
            source={require("../assets/hamBurgerIcon.png")}
            style={styles.ham}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {names.map((name, index) => (
          <Card
            key={index}
            resourceName={name}
            resourceQuantity={quantities[index]}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CheckResourcesPage;

// Card Component
const Card = ({ resourceName, resourceQuantity }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.resourceName}>{resourceName}</Text>
      <Text style={styles.resourceQuantity}>{resourceQuantity}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    justifyContent: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 3,
  },
  resourceName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  resourceQuantity: {
    fontSize: 16,
    color: "#555",
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
});
