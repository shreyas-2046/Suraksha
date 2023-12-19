import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import axios from "axios"; // For making HTTP requests
import { useDispatch } from "react-redux";
import { setToken } from "../slices/authSlice";

const FillLoginPage = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch(); // Move useDispatch outside the component function

  const handleRegisterPress = () => {
    navigation.navigate("VerifyEmail");
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://12.0.179.75:4000/api/v1/auth/login",
        {
          email: username,
          password: password,
        }
      );

      const token = response.data;
      // console.log("Token",token)
      // Use dispatch here
      dispatch(setToken(token));

      if (response.status === 200) {
        navigation.navigate("MainPage");
      }
    } catch (err) {
      console.log(err);
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
        <Text style={styles.slogan}>FillLoginPage</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter your AgencyID"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.Lbutton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.New_agency}>New Agency?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegisterPress}>
          <Text style={styles.Register}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
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
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: "white",
    padding: 15,
    marginVertical: 10,

    padding: 15,
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
  //   appName: {
  //     fontSize: 24,
  //     color: "white",
  //     fontWeight: "bold",
  //     marginTop: 10,
  //   },
  slogan: {
    fontSize: 16,
    color: "white",
    marginTop: -20,
  },
  buttonContainer: {
    width: "100%",
  },

  Lbutton: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 7,
    alignItems: "center",
    backgroundColor: "#FC5B28",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  footer: {
    marginTop: 170,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  New_agency: {
    color: "white",
  },
  Register: {
    color: "#FC5B28",
  },
});

export default FillLoginPage;
