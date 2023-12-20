import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import RequestCard from "../utils/RequestCard";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
// const agencyId = useSelector((state) => state.auth.token);



const PendingRequestPage = () => {
  const agencyId = useSelector((state) => state.auth.token);
  const [data,setData] = useState([])
  const fetchPendingRequests = async () => {
    try {
      const response = await axios.post(
        "https://tiny-pink-binturong-tutu.cyclic.app/api/v1/auth/receiver-pending-requests",
        {
          agencyID: agencyId.agency._id,
        }
      );
      setData(response.data.requests);
      console.log("data: ", response.data.requests);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);
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
          <Text style={styles.title}>Pending Request</Text>
          {/* <Text style={styles.subtitle}></Text> */}
        </View>
        <TouchableOpacity onPress={fetchPendingRequests}>
          <Image
            source={require("../assets/hamBurgerIcon.png")}
            style={styles.ham}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {
          data?.map((request, index) => (
            <RequestCard key={index} data={request} />
          ))
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default PendingRequestPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 45,
    paddingHorizontal: 6, // Add some padding for space
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
});
