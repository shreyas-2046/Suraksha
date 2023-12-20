import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const Card = ({ data }) => {
  const navigation = useNavigation();
  const goToRequestPage = () => {
    console.log(data._id);
    navigation.navigate("SendRequestPage", {
      objectId: data._id, // Assuming the ObjectId field is named _id
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{data.name}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.location}>{data.address}</Text>
      </View>
      <View style={styles.bodyt}>
        <Image
          source={require("../assets/phone.png")}
          style={{ width: 20, height: 20 }}
        />
        <Text style={styles.phoneNumber}>{data.contactNumber}</Text>
      </View>
      <View style={styles.resources}>
        <View styles={styles.eachR}>
          
          <View>
              {data.resources.map((resource, index) => (
                <View>
                <Text style={styles.resourceT} key={index}>{resource.name}</Text>
                <Text style={styles.resourceQ} key={index}>{resource.quantity}</Text>
                </View>
                
                
              ))}
          </View>
          {/* <View>
          {data.resources.map((resource, index) => (
                <Text key={index}>{resource.quantity}</Text>
              ))}
          </View> */}
        </View>
      </View>

      <TouchableOpacity style={styles.Lbutton} onPress={goToRequestPage}>
        <Text style={styles.buttonText}>Alert</Text>
      </TouchableOpacity>
    </View>
  );
};

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
    color: "white",
    fontWeight: "bold",
  },
  resourceQ: {
    color: "#FC5B28",
  },
});

export default Card;
