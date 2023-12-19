import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
// Import your screens and SVG icons
import HomePage from "./HomePage";
import MapsPage from "./MapsPage";
import Card from "../utils/Card";
// import ResourcesScreen from "./screens/ResourcesScreen";
// import RequestScreen from "./screens/RequestScreen";
// import ChatScreen from "./screens/ChatScreen";
// import HomeIcon from "./icons/HomeIcon"; // Import your converted SVG icon components

const Tab = createBottomTabNavigator();

export default function MainPage() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "orange",
        tabBarInactiveTintColor: "grey",
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      }}
    >
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{
          tabBarIcon: ({ color }) => (
            // Your Home icon component with color prop
            <Image
              source={require("../assets/homeIcon.png")}
              style={{ tintColor: color, width: 20, height: 20 }}
            />
          ),
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MapsPage"
        component={MapsPage}
        options={{
          tabBarIcon: ({ color }) => (
            // Your Maps icon component with color prop
            <Image
              source={require("../assets/mapIcon.png")}
              style={{ tintColor: color, width: 18, height: 18 }}
            />
          ),
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />
      {/* ... Add other Tab.Screen components */}
    </Tab.Navigator>
  );
}
