import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { NFCLottie } from "../../Utils/Lottie";
import { type FC, useState, useEffect } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Toast } from "react-native-toast-notifications";

type Props = {};
const failBiom = require("../../assets/Lotties/Biometric/bioFail.json");
const defBiom = require("../../assets/Lotties/Biometric/bioIntro.json");
const doneBiom = require("../../assets/Lotties/Biometric/bioDone.json");

type RootStackParamList = {
  Layout: {
    inOffice: boolean;
  };
};

type RouteProps = RouteProp<RootStackParamList, "Layout">;

const Passkey: FC = (props: Props) => {
  const route = useRoute<RouteProps>();
  const { inOffice } = route.params;

  const [biometricSupported, setBioMetricSupport] = useState<boolean | null>(
    null
  );
  const [lottieUri, setLottieUri] = useState<string>(defBiom);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>();

  const [buttonColor, setButtonColor] = useState<string>("#42A5F5"); // Default button color
  const [marginTop, setMarginTop] = useState<number>(0); // Default margin for success

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setBioMetricSupport(compatible);

      if (!compatible) {
        setLottieUri(failBiom);
        setButtonDisabled(true); // Disable button if no biometric hardware
        Toast.show("Biometric hardware missing", {
          type: "danger",
          placement: "bottom",
          duration: 4000,
          animationType: "slide-in",
        });
      }
    })();
  }, []);

  const handleBiometricAuth = async () => {
    const authResult = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate",
      fallbackLabel: "Use PIN",
      cancelLabel: "Cancel",
    });

    if (authResult.success) {
      setLottieUri(doneBiom);
      setButtonColor("green"); // Success -> green button
      setButtonDisabled(true); // Disable after success
      setMarginTop(2); // Add margin on success
    } else {
      setLottieUri(failBiom);
      setButtonColor("red"); // Failure -> red button
    }
  };

  const handleDisabledPress = () => {
    if (!biometricSupported) {
      Toast.show("Biometric hardware missing", {
        type: "warning",
        placement: "bottom",
        duration: 4000,
        animationType: "slide-in",
      });
    } else if (!inOffice) {
      Toast.show("You are not in the office", {
        type: "warning",
        placement: "bottom",
        duration: 4000,
        animationType: "slide-in",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.lottieContainer}>
        <NFCLottie uri={lottieUri} />
      </View>
      <View style={[styles.buttonContainer, { marginTop: 2 }]}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: buttonColor,
              opacity: buttonDisabled ? 0.6 : 1, // Dim button when disabled
            },
          ]}
          disabled={buttonDisabled || !biometricSupported}
          onPress={buttonDisabled ? handleDisabledPress : handleBiometricAuth}
        >
          <Text style={styles.buttonText}>Scan Biometric</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.scrollContainer}>
        <View style={styles.dataContainer}>
          <Text
            style={[
              styles.dataTitle,
              {
                color: biometricSupported && inOffice ? "#888" : "red", // Grey when default, red for issues
                fontWeight: biometricSupported && inOffice ? "normal" : "600", // Bold red for issues
              },
            ]}
          >
            {biometricSupported && inOffice
              ? "Uses geofencing and biometrics to log Attendance"
              : !biometricSupported
              ? "Biometric Hardware missing"
              : "You are not in the office"}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  lottieContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 80,
    zIndex: -40,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  button: {
    backgroundColor: "#42A5F5",
    borderRadius: 30,
    padding: 13,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  dataContainer: {
    width: "100%",
    padding: 16,
    backgroundColor: "#fff",
  },
  dataTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default Passkey;
