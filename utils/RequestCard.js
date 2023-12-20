import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import axios from "axios";

const RequestCard = ({data}) => {
  const handleAccept = async() => {
    try{
      const response = await axios.post(
        "https://tiny-pink-binturong-tutu.cyclic.app/api/v1/auth/receiver-action",
        {
          request_id: data._id,
          action: "Accepted",
        }
      );
      console.log("data: ", response.data.requests);

    }
    catch(err){
      console.log(err);
    }
  }
  const handleReject = async() => {
    try{
      const response = await axios.post(
        "https://tiny-pink-binturong-tutu.cyclic.app/api/v1/auth/receiver-action",
        {
          request_id: data._id,
          action: "Rejected",
        }
      );
      console.log("data: ", response.data.requests);
      
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.resourceT}>{data.from.name}</Text>
        {/* <Text>Request</Text> */}
      </View>
      <View style={styles.resourceasked}>
        <Text style={{ color: "white" }}>{data.resource.name[0]}</Text>
        <TouchableOpacity>
          <Text style={styles.resourceQ}>{data.resource.quantity[0]}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.Lbutton} onPress={handleAccept}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Rbutton} onPress={handleReject}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RequestCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#003366",
    width: "92%",
    marginLeft: "5%",
    marginTop: "5%",
    borderRadius: 30,
    padding: "5%",
  },

  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginEnd: 120,
    marginBottom: "7%",
  },
  body: {
    marginTop: "5%",
  },
  bodyt: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: "5%",
  },
  location: {
    fontSize: 16,
    color: "white",
    marginTop: -30,
    marginLeft: 5,
    marginEnd: 90,
    marginBottom: 5,
  },
  phoneNumber: {
    fontSize: 16,
    marginLeft: "2%",
    fontWeight: "bold",
    color: "#FF6600",
  },
  lastActive: {
    fontSize: 14,
    color: "#gray",
  },
  alert: {
    backgroundColor: "#red",
    padding: 10,
    alignItems: "center",
  },
  alertText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  Lbutton: {
    backgroundColor: "#3498db",
    padding: "5%",
    marginVertical: 10,
    borderRadius: 7,
    alignItems: "center",
    backgroundColor: "#FC5B28",
    width: "25%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 10,
  },
  resources: {
    display: "flex",
    flexDirection: "row",
    marginTop: "2%",
    padding: "5%",
  },
  eachR: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resourceT: {
    color: "#FC5B28",
    fontWeight: "bold",
    marginBottom: "5%",
  },
  resourceQ: {
    color: "#FC5B28",
    fontWeight: "bold",
  },
  resourceasked: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Rbutton: {
    backgroundColor: "#3498db",
    padding: 15,
    marginLeft: "5%",
    marginVertical: 10,
    borderBlockColor: "white",
    borderRadius: 7,
    borderWidth: 1, // Add border width
    borderColor: "white", // Set border color
    alignItems: "center",
    backgroundColor: "transparent",
    width: "25%",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end", // Align buttons to the right
    marginTop: 10,
  },
  smallButton: {
    backgroundColor: "#FC5B28",
    padding: 8,
    borderRadius: 7,
    alignItems: "center",
    width: 70, // Set a fixed width for smaller buttons
  },
});
