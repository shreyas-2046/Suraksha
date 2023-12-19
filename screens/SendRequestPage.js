import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const SendRequestPage = () => {
  const [resource, setResource] = useState("");
  const [quantity, setQuantity] = useState("");

  const sendRequest = () => {
    // Perform Axios POST request with resource and quantity
    // Example:
    // axios.post('your_backend_api', { resource, quantity })
    //   .then((response) => {
    //     // Handle response
    //   })
    //   .catch((error) => {
    //     // Handle error
    //   });
    console.log("Resource:", resource);
    console.log("Quantity:", quantity);
  };

  const resetFields = () => {
    setResource("");
    setQuantity("");
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
          <Text style={styles.subtitle}>Pune,Maharastra</Text>
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
