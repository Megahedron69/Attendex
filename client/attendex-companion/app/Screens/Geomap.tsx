import { type FC, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
} from "react-native";
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from "react-native-maps";
import { mapStyle } from "../../Utils/MapStyles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRoute } from "@react-navigation/native";
import { type RouteProps } from "../../Utils/Constants";
import { Toast } from "react-native-toast-notifications";
const Geomap: FC = () => {
  const route = useRoute<RouteProps>();
  const { userLocation, inOffice } = route.params;

  // Define office location coordinates and radius
  const officeLocation = {
    latitude: 28.684539218304558,
    longitude: 77.31288879111467,
    radius: 100,
  };

  // State to manage button disabled status and color
  const [buttonDisabled, setButtonDisabled] = useState<boolean>();
  const [buttonColor, setButtonColor] = useState<string>(
    inOffice ? "green" : "red"
  );

  const handlePress = () => {
    if (inOffice === false) {
      Toast.show("User not in office", {
        type: "warning",
        placement: "bottom",
        duration: 4000,
        animationType: "slide-in",
      });
      return;
    }
    setButtonDisabled(true);
    setButtonColor("green"); // Change to green to indicate success
  };

  return (
    <SafeAreaView style={styles.container}>
      {userLocation && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: officeLocation.latitude,
            longitude: officeLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
          showsMyLocationButton={false}
          customMapStyle={mapStyle}
        >
          {/* Office marker */}
          <Marker
            coordinate={{
              latitude: officeLocation.latitude,
              longitude: officeLocation.longitude,
            }}
            title="Office Location"
          >
            <MaterialCommunityIcons
              name="office-building-marker"
              size={52}
              color={inOffice ? "green" : "red"}
            />
          </Marker>

          {/* Office geofence radius */}
          <Circle
            center={{
              latitude: officeLocation.latitude,
              longitude: officeLocation.longitude,
            }}
            radius={officeLocation.radius}
            strokeColor="rgba(0, 150, 255, 0.5)"
            fillColor="rgba(0, 150, 255, 0.3)"
          />

          {/* User marker */}
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Your Location"
          >
            <MaterialCommunityIcons
              name="map-marker-account"
              size={52}
              color={inOffice ? "green" : "red"}
            />
          </Marker>
        </MapView>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: buttonColor, // Button color changes based on the office status and after press
              opacity: buttonDisabled ? 0.6 : 1, // Dim button when disabled
            },
          ]}
          disabled={buttonDisabled} // Disable if not in office or after press
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>Log Attendance</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    top: 50,
    zIndex: 500,
  },
  button: {
    backgroundColor: "#42A5F5",
    borderRadius: 30,
    padding: 13,
    width: "90%", // Button width
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
});

export default Geomap;
