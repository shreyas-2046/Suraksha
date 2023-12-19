import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

const LoginPage = ({ navigation }) => {
  const handleLoginInPress = () => {
    navigation.navigate("FillLoginPage");
  };
  const handleRegisterPress = () => {
    navigation.navigate("VerifyEmail");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/AppLogo.png")} style={styles.logo} />
        <Image
          source={require("../assets/AppName.png")}
          style={styles.AppName}
        />
        <Text style={styles.slogan}>Unite, Respond, Protect</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.Rbutton} onPress={handleRegisterPress}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Lbutton} onPress={handleLoginInPress}>
          <Text style={styles.buttonText}>Login</Text>
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
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
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
  Rbutton: {
    backgroundColor: "#3498db",
    padding: 15,

    marginVertical: 10,
    borderBlockColor: "white",
    borderRadius: 7,
    borderWidth: 1, // Add border width
    borderColor: "white", // Set border color
    alignItems: "center",
    backgroundColor: "transparent",
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

export default LoginPage;
