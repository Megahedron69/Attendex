import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { signOut } from "../../Utils/Auth";
import { isInFence } from "../../Utils/Attendance";
import { Toast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/native";
const useGeofencing = () => {
  const navigation = useNavigation();
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [inOffice, setInOffice] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchLocationAndCheckGeofence = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show(
          "Precise Location permission required to proceed! Signing out",
          {
            type: "danger",
            placement: "bottom",
            duration: 4000,
            animationType: "zoom-in",
          }
        );
        signOut(navigation);
      }
      try {
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High, // Request precise location
        });
        const { latitude, longitude } = location.coords;
        setUserLocation({ latitude, longitude });
        const response = await isInFence(latitude, longitude);
        if (response && response.status) {
          setInOffice(true);
          Toast.show(response.message, {
            type: "success",
            placement: "center",
            duration: 4000,
            animationType: "slide-in",
            successColor: "#82DD55",
          });
        } else {
          setInOffice(false);
          Toast.show(response.message, {
            type: "warning",
            placement: "bottom",
            duration: 4000,
            animationType: "zoom-in",
          });
        }
      } catch (error) {
        Toast.show("Error fetching location or checking geofence", {
          type: "danger",
          placement: "bottom",
          duration: 4000,
          animationType: "zoom-in",
        });
      }
    };
    fetchLocationAndCheckGeofence();
  }, []);

  return { userLocation, inOffice };
};

export default useGeofencing;
