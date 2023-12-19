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
import Icon from "react-native-vector-icons/FontAwesome";
// Import your screens and SVG icons
import HomePage from "./HomePage";
import MapsPage from "./MapsPage";
import Card from "../utils/Card";
// import ResourcesScreen from "./screens/ResourcesScreen";
// import RequestScreen from "./screens/RequestScreen";
// import ChatScreen from "./screens/ChatScreen";
// import HomeIcon from "./icons/HomeIcon"; // Import your converted SVG icon components
import { FontAwesome } from "@expo/vector-icons";
import PendingRequestPage from "./PendingRequestPage";
import RequestHistoryPage from "./RequestHistoryPage";
import InventoryPage from "./InventoryPage";
import AddResourcePage from "./AddResourcePage";
import SendRequestPage from "./SendRequestPage";
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
          tabBarIcon: ({ colors }) => (
            // Your Home icon component with color prop
            <Image
              source={require("../assets/homeIcon.png")}
              style={{ tintColor: colors, width: 20, height: 20 }}
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
          tabBarIcon: ({ colors }) => (
            // Your Maps icon component with color prop
            <FontAwesome
              name="map-marker"
              size={23}
              color={colors}
              style={{ width: 20, height: 20 }}
            />
          ),
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />
      {/* ... Add other Tab.Screen components */}
      <Tab.Screen
        name="bell"
        component={PendingRequestPage}
        options={{
          tabBarIcon: ({ colors }) => (
            // Your Maps icon component with color prop
            <Icon
              name="bell" // Use "bell" for the bell icon in FontAwesome
              size={20}
              color={colors}
              style={{ width: 20, height: 20 }}
            />
          ),
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />
      {/* <Tab.Screen
        name="RequestHistory"
        component={RequestHistoryPage}
        options={{
          tabBarIcon: ({ colors }) => (
            // Your Maps icon component with color prop
            <FontAwesome
              name="history"
              size={20}
              color={colors}
              style={{ width: 20, height: 20 }}
            />
          ),
          tabBarShowLabel: false,
          headerShown: false,
        }}
      /> */}

      <Tab.Screen
        name="AddResourcePage"
        component={AddResourcePage}
        options={{
          tabBarIcon: ({ colors }) => (
            // Your Maps icon component with color prop
            <Icon
              name="history"
              size={20}
              color={colors}
              style={{ width: 20, height: 20 }}
            />
          ),
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />
      {/* <Tab.Screen
        name="Inventory"
        component={InventoryPage}
        options={{
          tabBarIcon: ({ colors }) => (
            // Your Maps icon component with color prop
            <Icon
              name="archive"
              size={20}
              color={colors}
              style={{ width: 20, height: 20 }}
            />
          ),
          tabBarShowLabel: false,
          headerShown: false,
        }}
      /> */}
      <Tab.Screen
        name="SendRequestPage"
        component={SendRequestPage}
        options={{
          tabBarIcon: ({ colors }) => (
            // Your Maps icon component with color prop
            <Icon
              name="archive"
              size={20}
              color={colors}
              style={{ width: 20, height: 20 }}
            />
          ),
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
