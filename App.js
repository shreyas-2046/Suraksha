import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginPage from "./screens/LoginPage";
import RegisterPage from "./screens/RegisterPage";
import FillLoginPage from "./screens/FillLoginPage";
import OtpPage from "./screens/OtpPage";
import VerifyEmail from "./screens/VerifyEmail";
import MapsPage from "./screens/MapsPage";
import MainPage from "./screens/MainPage";
import FillResources from "./screens/FillResources";
const Tab = createBottomTabNavigator();
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
const Stack = createNativeStackNavigator();

const store = configureStore({
  reducer: rootReducer,
});

////////////////////////////////////////////////////////////////
// use this code for importing slices :)
// const token = useSelector(state => state.auth)
// console.log( "Token : " ,token);

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Home Page of Suraksha</Text>
    //   <StatusBar style="auto" />
    // </View>

    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="FillLoginPage">
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={LoginPage}
          />

          <Stack.Screen
            name="FillLoginPage"
            component={FillLoginPage}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="RegisterPage"
            component={RegisterPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="VerifyEmail"
            component={VerifyEmail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OtpPage"
            component={OtpPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Maps"
            component={MapsPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FillResources"
            component={FillResources}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MainPage"
            component={MainPage}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
