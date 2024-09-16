import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, View, Text } from "react-native";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ToastProvider } from "react-native-toast-notifications";
import { FontAwesome6 } from "@expo/vector-icons";
import SignIn from "./app/Auth/SignIn";
import { checkAuthStatus } from "./Utils/Auth";
import { NFCLottie } from "./Utils/Lottie";
import Layout from "./app/Home/Layout";

const Stack = createNativeStackNavigator();
const loadingLottie = require("./assets/Lotties/loading.json");
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        setLoading(true);
        const status = await checkAuthStatus();
        setIsAuthenticated(status);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching authentication status:", error);
        setLoading(false);
        setIsAuthenticated(false); // Default to not authenticated on error
      }
    };
    fetchAuthStatus();
  }, []);

  if (loading && !isAuthenticated) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <NFCLottie uri={loadingLottie} />
        <Text
          style={{
            backgroundColor: "white",
            width: "100%",
            textAlign: "center",
            fontSize: 32,
            fontWeight: 500,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Loading...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, display: "flex", backgroundColor: "#fff" }}>
      <ToastProvider
        successColor="#42A5F5"
        dangerColor="#f87171"
        successIcon={<FontAwesome6 name="user-check" size={24} color="black" />}
        dangerIcon={<FontAwesome6 name="user-xmark" size={24} color="black" />}
        swipeEnabled
        style={{ borderRadius: 30 }}
      >
        <NavigationContainer>
          <PaperProvider>
            <Stack.Navigator
              initialRouteName={isAuthenticated ? "Home" : "SignIn"}
            >
              <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{
                  header: () => null,
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="Home"
                component={Layout}
                options={{
                  header: () => null,
                  animation: "slide_from_right",
                }}
              />
            </Stack.Navigator>
            <StatusBar
              style="auto"
              animated={true}
              translucent={true}
              backgroundColor="transparent"
            />
          </PaperProvider>
        </NavigationContainer>
      </ToastProvider>
    </SafeAreaView>
  );
}
