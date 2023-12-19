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

const VerifyEmail = ({ navigation }) => {
  const [email, setemail] = useState("");
  const handleLogin = async () => {
    if (email) {
      try {
        // Make a POST request to backend to send OTP email
        const response = await axios.post(
          "http://192.168.192.223:4000/api/v1/auth/sendOtp",
          {
            email, // Assuming username is the email entered
          }
        );

        if (response.status === 200) {
          navigation.navigate("OtpPage", { email }); // Navigate to OTP page
        } else {
          // Handle error in sending OTP email
        }
      } catch (error) {
        console.error("Error sending OTP email:", error);
        // Handle error
      }
    } else {
      // Handle empty fields
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/AppLogo.png")} style={styles.logo} />
        <Image
          source={require("../assets/AppName.png")}
          style={styles.AppName}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="email"
        placeholderTextColor="black"
        value={email}
        onChangeText={(text) => setemail(text)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.Lbutton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VerifyEmail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#003366",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  input: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
    color: "black",
    padding: 15,
    marginVertical: 10,
    padding: 15,
    backgroundColor: "white",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  logo: {
    width: 200, // Adjust the dimensions according to your logo size
    height: 200,
    resizeMode: "contain",
    marginBottom: -30,
  },
  AppName: {
    width: 100, // Adjust the dimensions according to your logo size
    height: 100,
    resizeMode: "contain",
    padding: 0,
  },
  buttonContainer: {
    width: "100%",
  },

  Lbutton: {
    backgroundColor: "#3498db",
    padding: 15,
    marginVertical: 10,
    borderRadius: 7,
    alignItems: "center",
    backgroundColor: "#FC5B28",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
