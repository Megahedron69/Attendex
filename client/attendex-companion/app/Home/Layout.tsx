import { View, StyleSheet, useWindowDimensions } from "react-native";
import { type FC, useState, useEffect } from "react";
import NFCHeader from "./Header";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import NFCreader from "../Screens/NFCreader";
import Passkey from "../Screens/Passkey";
import Geomap from "../Screens/Geomap";
import Qr from "../Screens/Qr";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import useGeofencing from "../Hooks/useGeofence";

const Tabs = AnimatedTabBarNavigator();

const Layout: FC<{ navigation: any }> = ({ navigation }) => {
  const { userLocation, inOffice } = useGeofencing();
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    if (userLocation && inOffice !== null) {
      navigation.setParams({ userLocation, inOffice });
    }
  }, [userLocation, inOffice, navigation]);

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", height: 200 }}>
        <NFCHeader />
      </View>
      <View style={{ flex: 1 }}>
        <Tabs.Navigator
          initialRouteName="NFC"
          tabBarOptions={{
            activeTintColor: "#2F7C6E",
            inactiveTintColor: "black",
          }}
          appearance={{
            tabBarBackground: "#f8f3f9",
            floating: true,
            activeTabBackgrounds: "#42A5F5",
            activeColors: "#fff",
          }}
          backBehavior="none"
          screenOptions={{
            header: () => null,
          }}
        >
          <Tabs.Screen
            name="NFC"
            component={NFCreader}
            initialParams={{ inOffice }}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <FontAwesome6
                  name="nfc-symbol"
                  size={size ? size : 24}
                  color={focused ? color : "#222222"}
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="Biometric"
            component={Passkey}
            initialParams={{ inOffice }}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <FontAwesome6
                  name="fingerprint"
                  size={size ? size : 24}
                  color={focused ? color : "#222222"}
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="Geofencing"
            initialParams={{ userLocation, inOffice, width, height }}
            component={Geomap}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <FontAwesome6
                  name="location-crosshairs"
                  size={size ? size : 24}
                  color={focused ? color : "#222222"}
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="QR"
            component={Qr}
            initialParams={{ inOffice, width, height }}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <FontAwesome6
                  name="qrcode"
                  size={size ? size : 24}
                  color={focused ? color : "#222222"}
                  focused={focused}
                />
              ),
            }}
          />
        </Tabs.Navigator>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  headerContainer: {
    flex: 1,
    width: "100%",
  },
});
export default Layout;
