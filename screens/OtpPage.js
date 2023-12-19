import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import OTP from "react-native-otp-form";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
const OtpPage = ({ navigation }) => {
  const [otp, setOtp] = useState(0);
  const route = useRoute();
  const email = route.params?.email || "No email found";
  const goBackVerifyEmail = () => {
    navigation.navigate("VerifyEmail");
  };
  const printotp = () => {
    console.log(otp);
  };
  const handleOtpVerification = async () => {
    try {
      
      console.log(otp);
      // Make a request to backend to verify OTP
      // Handle logic after OTP verification
      const response = await axios.post(
        "http://192.168.192.136:4000/api/v1/auth/verifyOtp",
        {
          email,
          otp,
        }
      );
      if (response.status === 200) {
        navigation.navigate("RegisterPage", { email });
      } else if (response.status === 400) {
        console.log("OTP Incorrect");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      // Handle error
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/AppLogo.png")} style={styles.logo} />
        <Image
          source={require("../assets/AppName.png")}
          style={styles.AppName}
        />
      </View>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          color: "#FC5B28",
          marginBottom: 20,
          marginRight: 150,
        }}
      >
        Almost there
      </Text>
      <Text style={{ color: "white", marginBottom: 30 }}>
        Please enter the 6-digit code sent to your email
        <Text style={{ fontWeight: "bold" }}> {email} </Text> for verification.
      </Text>

      {/* <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        value={otp}
        onChangeText={(text) => setOtp(text)}
      /> */}

      {/* Other UI components */}
      <OTP
        codeCount={6}
        containerStyle={{}}
        otpStyles={{
          backgroundColor: "#FC5B28",
          color: "white",
          marginBottom: 10,
        }}
        onTyping={(code) => {
          setOtp(code);
        }}
      />

      <TouchableOpacity
        style={styles.verifyButton}
        onPress={handleOtpVerification}
      >
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>
      {/* <Text style={{ color: "white", marginRight: 150, marginTop: 10 }}>
        didnt recieve any code?
      </Text> */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white", marginTop: 30, marginRight: 5 }}>
          No Otp?
        </Text>
        <TouchableOpacity onPress={goBackVerifyEmail}>
          <Text
            style={{
              color: "#FC5B28",
              marginTop: 30,
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Verify Agency
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
  verifyButton: {
    backgroundColor: "#FC5B28",
    marginTop: 10,
    padding: 15,
    borderRadius: 7,
    alignItems: "center",
    width: "90%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  // Other styles

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
    marginBottom: -20,
  },
  slogan: {
    fontSize: 16,
    color: "white",
    marginTop: -20,
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 180,
    marginTop: -50,
  },

  Vbutton: {
    backgroundColor: "#3498db",
    padding: 15,
    marginVertical: 10,
    borderRadius: 7,
    alignItems: "center",
    backgroundColor: "#FC5B28",
    width: "89%",
    marginHorizontal: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  footer: {
    marginTop: -10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  New_agency: {
    color: "white",
  },
  Register: {
    color: "#FC5B28",
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  otpbox: {
    backgroundColor: "#FC5B28",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginVertical: 75,
    borderWidth: 0,
    borderRadius: 8,
    fontSize: 20,
  },
});

export default OtpPage;
