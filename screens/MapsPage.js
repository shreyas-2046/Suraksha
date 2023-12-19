import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker, Callout } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";
import { useSelector } from "react-redux";

const MapsPage = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [tappedLocation, setTappedLocation] = useState(null); // Add this line
  const [errorMsg, setErrorMsg] = useState(null);
  const mapViewRef = useRef(null);
  const searchRef = useRef(null);
  const NearbyData = useSelector(state => state.nearby.nearby);
  console.log('Nearby data in redux',NearbyData);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let cords = await Location.getCurrentPositionAsync();

      const initialRegion = {
        latitude: cords?.coords?.latitude || 0,
        longitude: cords?.coords?.longitude || 0,
        latitudeDelta: calculateDelta(15),
        longitudeDelta: calculateDelta(15),
      };

      setCurrentLocation(initialRegion);
      setSelectedLocation(initialRegion);
    })();
  }, []);

  const calculateDelta = (zoomLevel) => {
    const baseDelta = 0.02;
    return baseDelta / zoomLevel;
  };

  const calculateRegionDelta = (viewport, multiplier = 1.4) => {
    if (!viewport) {
      return {
        latitudeDelta: calculateDelta(15),
        longitudeDelta: calculateDelta(15),
      };
    }

    const latDelta = Math.abs(viewport.northeast.lat - viewport.southwest.lat);
    const lonDelta = Math.abs(viewport.northeast.lng - viewport.southwest.lng);

    const calculatedMultiplier = Math.max(latDelta, lonDelta) / 2;

    return {
      latitudeDelta: latDelta * calculatedMultiplier * multiplier,
      longitudeDelta: lonDelta * calculatedMultiplier * multiplier,
    };
  };

  const handleMarkerPress = (location) => {
    console.log("Marker pressed. Location details:", location);
    setSelectedLocation(location);
  };

  //  IHE INPUT FIELD OF GOOGLEPLACESAUTOCOMPLETE SHOULD SET TO ""
  // WHEN CLICKED ON CLEAR BUTTON
  const clearSearch = () => {
    if (searchRef.current) {
      searchRef.current.setAddressText("");
    }
  };

  const handlePlacePress = (data, details = null) => {
    const point = details?.geometry?.location;
    if (!point) {
      setSelectedLocation(currentLocation);
      return;
    }

    setSelectedLocation({
      latitude: point.lat,
      longitude: point.lng,
    });

    const regionDelta = calculateRegionDelta(details?.viewport);

    const newRegion = {
      latitude: point.lat,
      longitude: point.lng,
      ...regionDelta,
    };

    mapViewRef.current.animateToRegion(newRegion, 3000);
  };

  const handleMapPress = (coordinate) => {
    console.log("Coordinates:", coordinate);
    setTappedLocation({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });
  };

  if (!currentLocation) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color="#4285F4" />
      </SafeAreaView>
    );
  }

  // const nearby_api_call = {
  //   success: true,
  //   message: "Nearby Agencies",
  //   nearby: [
  //     {
  //       _id: "657d9ec012e66e2243f5a6f8",
  //       name: "Bhavesh hospital ",
  //       email: "bmmankar25@gmail.com",
  //       password:
  //         "$2b$10$x3RntoPOE61UMv10o/hESupmPdPo5VMlK7db8EgZyUKJ5cLhvgfA.",
  //       lat: 18.4533103,
  //       lng: 73.8832127,
  //       location: {
  //         type: "Point",
  //         coordinates: [18.4533103, 73.8832127],
  //       },
  //       address: "Aurangabad ",
  //       agencyType: "Hospital",
  //       resources: ["657fd66cc2941d6733232b74"],
  //       contactNumber: 455155545,
  //       __v: 1,
  //       distance: 7515530.912654883,
  //     },
  //     {
  //       _id: "657fe367745a40aeb656e9fb",
  //       name: "Andhra Police",
  //       email: "fadiv78815@anawalls.com",
  //       password:
  //         "$2b$10$vHKaj0wWFrOv9aHmqFp7zea9Cpg8Inuoyc6X5I2OKVt11yrZixriW",
  //       lat: 14.8824698,
  //       lng: 78.016863,
  //       location: {
  //         type: "Point",
  //         coordinates: [14.8824698, 78.016863],
  //       },
  //       address: "Near railway station ",
  //       agencyType: "Police",
  //       resources: [],
  //       contactNumber: 966666,
  //       __v: 0,
  //       distance: 7794090.879070987,
  //     },
  //     {
  //       _id: "657fe6c7741fb42d55d59f10",
  //       name: "Andhra CRPF",
  //       email: "focusedbanda117@gmail.com",
  //       password:
  //         "$2b$10$c90y86.DvRApQev27BT71e/wn.VsewD8C8gE1KjVeFcYpoQfZGHPW",
  //       lat: 14.8787589,
  //       lng: 78.0486099,
  //       location: {
  //         type: "Point",
  //         coordinates: [14.8787589, 78.0486099],
  //       },
  //       address: "Near railway station ",
  //       agencyType: "CRPF",
  //       resources: [],
  //       contactNumber: 123456789,
  //       __v: 0,
  //       distance: 7795574.01738895,
  //     },
  //     {
  //       _id: "657fe8f3741fb42d55d59f21",
  //       name: "Chittoor firebrigade",
  //       email: "vefyimaydo@gufum.com",
  //       password:
  //         "$2b$10$5ZbYCpA1lQdvfH.qD49oEemPmQFZPWBw9.4BYPr09q.ybR7MFMFFm",
  //       lat: 14.8334225,
  //       lng: 78.1145705,
  //       location: {
  //         type: "Point",
  //         coordinates: [14.8334225, 78.1145705],
  //       },
  //       address: "Near chittor",
  //       agencyType: "Fire-Brigade",
  //       resources: [],
  //       contactNumber: 54846467,
  //       __v: 0,
  //       distance: 7799447.704361984,
  //     },
  //     {
  //       _id: "657feaaa741fb42d55d59f2d",
  //       name: "Andhra Army",
  //       email: "9i1dkm4blt@zipcatfish.com",
  //       password:
  //         "$2b$10$NwBr4j1UDwgXq/1tyO3x1Og9DpWxxnE1K2EwxWfUuWVNBUGM2mkJS",
  //       lat: 14.7707707,
  //       lng: 78.1929568,
  //       location: {
  //         type: "Point",
  //         coordinates: [14.7707707, 78.1929568],
  //       },
  //       address: "Near restricted area",
  //       agencyType: "Army",
  //       resources: [],
  //       contactNumber: 1234546,
  //       __v: 0,
  //       distance: 7804224.405124164,
  //     },
  //   ],
  // };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log("Back button pressed")}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Maps</Text>
      </View>

      <GooglePlacesAutocomplete
        placeholder="Search For Nearby Rescue Agencies"
        fetchDetails={true}
        onPress={handlePlacePress}
        query={{ key: process.env.EXPO_PUBLIC_MAPS_API_KEY, language: "en" }}
        styles={{
          container: {
            flex: 0,
            backgroundColor: "#fff",
          },
          textInputContainer: {
            backgroundColor: "#fff",
            borderTopWidth: 0,
            borderBottomWidth: 0,
          },
          textInput: {
            marginLeft: 0,
            marginRight: 0,
            height: 48,
            color: "#333",
            fontSize: 18,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#ccc",
            paddingLeft: 16,
          },
          predefinedPlacesDescription: {
            color: "#1faadb",
          },
        }}
        renderRightButton={() => (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              setSelectedLocation(currentLocation);
              clearSearch();
            }}
          >
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
        )}
        clearSearchs={false}
        ref={(ref) => (searchRef.current = ref)}
      />

      <MapView
        ref={mapViewRef}
        showsUserLocation={true}
        renderUserLocation={() => (
          <MapView.Circle
            center={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            radius={200}
            fillColor="rgba(0, 128, 255, 0.1)"
            strokeColor="rgba(0, 128, 255, 0.3)"
          />
        )}
        style={styles.map}
        region={currentLocation}
        onRegionChangeComplete={(newRegion) => {
          setCurrentLocation(newRegion);
        }}
        showsCompass={true}
        showsMyLocationButton={true}
        loadingEnabled={true}
        onPress={(event) => handleMapPress(event.nativeEvent.coordinate)}
      >
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }}
            title="Selected Location"
            pinColor="#FF0000"
          >
            <Callout onPress={() => handleMarkerPress(selectedLocation)}>
              <View style={styles.callout}>
                <Text>Details about the location</Text>
              </View>
            </Callout>
          </Marker>
        )}

        {/* For adding markers to all nearby places call  */}

        {Array.isArray(NearbyData) && NearbyData.length > 0 ?
  (NearbyData.map((agency, index) => (
    <Marker
      key={index}
      coordinate={{
        latitude: agency?.lat || 0, // Use a default value if latitude is undefined
        longitude: agency?.lng || 0, // Use a default value if longitude is undefined
      }}
      title={agency.name}
      description={agency.address}
      pinColor="#000FFF" // can customize the pin color
    />
  ))):(<></>)}

        {tappedLocation && (
          <Marker
            coordinate={tappedLocation}
            title="Tapped Location"
            pinColor="#00FF00"
          />
        )}
      </MapView>

      <View style={styles.absoluteBox}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log("Selected Location:", selectedLocation);
          }}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MapsPage;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 20,
    marginLeft: 16,
    fontWeight: "bold",
  },
  map: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  absoluteBox: {
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  button: {
    backgroundColor: "#FC5B28",
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 20,
    alignItems: "center",
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#ffffff",
  },
  callout: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 4,
  },
  clearButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 16,
  },
});
