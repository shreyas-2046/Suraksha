import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Touchable,
  TextInput,
} from "react-native";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
//import Counter from "react-native-counters";

const AddResourcePage = ({ navigation }) => {
  const [searchedValue, setSearchedValue] = useState("");
  const [quantity, setQuantity] = useState(""); // Initial quantity value

  const data = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  const AgencyData = useSelector((state) => state.auth.token);
  console.log(AgencyData.agency.name);

  const handleclickadd = async () => {
    try {
      const { agency } = AgencyData;

      // Extracting resource name and quantity
      const resources = agency.resources || [];

      // Iterate through resources array to extract name and quantity
      // resources.forEach(resource => {
      //   resourceNames.push(resource.name);
      //   resourceQuantities.push(resource.quantity);
      // });

      const response = await axios.post(
        "https://tiny-pink-binturong-tutu.cyclic.app/api/v1/auth/add-resource",
        {
          // lat: location.coords.latitude,
          // lng : location.coords.longitude,
          agencyId: agency._id,
          resourceName: searchedValue,
          resourceQuantity: quantity,
        }
      );

      if (agency && agency.resources) {
        console.log("Resources:", agency.resources.name);
      }
    } catch (err) {
      console.error("Error Fetching nearby data : ", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.agency}>
        <View style={styles.circle}>
          <Image
            style={styles.logo}
            source={require("../assets/AppLogo.png")} // replace with your logo path
          />
        </View>
        <View>
          <Text style={styles.agencyName}>{AgencyData.agency.name}</Text>
          <Text style={styles.agencyAddress}>{AgencyData.agency.address}</Text>
        </View>
      </View>

      <View>
        <Text style={styles.toDo}>Add a Resource</Text>
      </View>
      <View marginTop={15}>
        <View style={styles.field1}>
          <Text style={styles.statement}>Type of Resource</Text>
          <Image
            source={require("../assets/typeOfResource.png")}
            size={25}
            color="#FF6600"
            style={{ marginLeft: 100 }}
          />
        </View>
        <View style={styles.dropdown}>
          <TextInput
            style={styles.input}
            placeholder="Resource Name"
            value={searchedValue}
            onChangeText={(text) => setSearchedValue(text)}
          />
        </View>

        <View style={styles.field2}>
          <Text style={styles.statement}>Quantity</Text>
          {/* <View style={styles.counterContainer}>
            <TouchableOpacity
              onPress={() => setQuantity(Math.max(quantity - 1, 0))}
            >
              <FontAwesome name="minus" size={21} color="#FF6600" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
              <FontAwesome name="plus" size={21} color="#FF6600" />
            </TouchableOpacity>
          </View> */}
        </View>
        {/*do send an axios request on clicking it refer FIllResources.js for the logic */}
        <View style={styles.dropdown}>
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            value={quantity}
            onChangeText={(text) => setQuantity(text)}
          />
        </View>
        <TouchableOpacity onPress={handleclickadd}>
          <Image
            style={styles.plus_circle}
            source={require("../assets/plus_circle.png")}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    paddingTop: 5,
    justifyContent: "center",
  },
  agency: {
    flexDirection: "row",
    alignItems: "center",
    //padding: 10,
    //paddingBottom: 20,
    paddingLeft: 10,
    marginTop: -200,
  },
  circle: {
    width: 58,
    height: 58,
    borderRadius: 100,
    borderWidth: 1,
    overflow: "hidden",
    marginRight: 5,
    marginLeft: 10,
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
  logo: {
    width: 40,
    height: 43,
    marginRight: 5,
    marginLeft: 8,
    marginTop: 6,
  },
  agencyName: {
    fontWeight: "bold",
    fontSize: 30,
    //marginTop: ,
    paddingHorizontal: 10,
  },
  agencyAddress: {
    fontSize: 15,
    paddingHorizontal: 10,
  },
  toDo: {
    marginTop: 100,
    marginLeft: 50,
    fontSize: 30,
  },
  field1: {
    flexDirection: "row",
    backgroundColor: "#003366",
    fontWeight: "bold",
    padding: 15,
    marginVertical: 10,
    borderRadius: 7,
    borderWidth: 1, // Add border width
    width: "70%",
    height: 50,
    marginLeft: 50,
    marginTop: 20,
  },
  field2: {
    flexDirection: "row",
    backgroundColor: "#003366",
    fontWeight: "bold",
    padding: 15,
    marginVertical: 10,
    borderRadius: 7,
    borderWidth: 1, // Add border width
    width: "70%",
    height: 50,
    marginLeft: 50,
    marginTop: 10,
  },
  statement: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  plus_circle: {
    marginLeft: 270,
    marginTop: 20,
  },
  dropdown: {
    backgroundColor: "white",
    fontWeight: "bold",
    marginVertical: 10,
    borderRadius: 7,
    borderWidth: 1, // Add border width
    width: 260,
    height: 50,
    marginLeft: 50,
    marginTop: -5,
  },
  counterButton: {
    backgroundColor: "#FF6600", // Customize the button color
    //borderRadius: 1,
    //padding: 8,
    marginHorizontal: 25,
    //marginEnd: 1,
    marginTop: -5,
    height: 20,
    borderWidth: 0,
  },

  counterContainer: {
    marginLeft: 102,
    flexDirection: "row",
    alignItems: "center",
  },
  quantityText: {
    color: "white",
    fontSize: 16,
    marginHorizontal: 18,
  },
  input: {
    flex: 1,
    padding: "5%",
    // borderWidth: 1,
    // borderColor: "#ccc",
    // borderRadius: 5,
    // paddingVertical: 8,
    // paddingHorizontal: 12,
    // marginRight: 10,
  },
});

export default AddResourcePage;
