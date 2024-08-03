import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, View, Text } from "react-native";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ToastProvider } from "react-native-toast-notifications";
import { FontAwesome6 } from "@expo/vector-icons";
import SignIn from "./app/SignIn";
import NFCreader from "./app/NFCreader";
import { checkAuthStatus } from "./Utils/Auth";
import { LoadingLottie } from "./app/Lottie";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const status = await checkAuthStatus();
        setIsAuthenticated(status);
      } catch (error) {
        console.error("Error fetching authentication status:", error);
        setIsAuthenticated(false); // Default to not authenticated on error
      }
    };
    fetchAuthStatus();
  }, []);

  if (isAuthenticated === null) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <LoadingLottie />
        <Text>Loading...</Text>
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
              initialRouteName={isAuthenticated ? "NFC" : "SignIn"}
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
                name="NFC"
                component={NFCreader}
                options={{
                  header: () => null,
                  animation: "slide_from_left",
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
