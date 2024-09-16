import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import NfcManager, { NfcTech, NfcEvents } from "react-native-nfc-manager";
import { NFCLottie } from "../../Utils/Lottie";
import { Toast } from "react-native-toast-notifications";
import { type RouteProps } from "../../Utils/Constants";
import { useRoute } from "@react-navigation/native";

const NFCreader = () => {
  const route = useRoute<RouteProps>();
  const { inOffice } = route.params;

  const [nfcData, setNfcData] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [nfcSupported, setNfcSupported] = useState<boolean>(true);
  const [lottieUri, setLottieUri] = useState(
    require("../../assets/Lotties/NFC/nfc.json")
  );
  console.log(inOffice);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>();
  const [buttonColor, setButtonColor] = useState<string>("#42A5F5"); // Default button color

  useEffect(() => {
    NfcManager.start();
    checkNfcPermission();

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.setEventListener(NfcEvents.SessionClosed, null);
      NfcManager.close();
    };
  }, []);

  const checkNfcPermission = async () => {
    const isEnabled = await NfcManager.isEnabled();
    if (!isEnabled) {
      setLottieUri(require("../../assets/Lotties/NFC/nfcdead.json"));
      Toast.show("NFC hardware not available!", {
        type: "danger",
        placement: "top",
        duration: 4000,
        animationType: "zoom-in",
      });
      setNfcSupported(false);
      setButtonDisabled(true); // Disable button if no NFC hardware
      return;
    }
    setHasPermission(true);
  };

  const readNfcTag = async () => {
    if (!hasPermission || !nfcSupported) {
      setLottieUri(require("../../assets/Lotties/NFC/nfcdead.json"));
      Toast.show("NFC Permissions required!", {
        type: "danger",
        placement: "top",
        duration: 4000,
        animationType: "zoom-in",
      });
      return;
    }
    if (inOffice === false) {
      setLottieUri(require("../../assets/Lotties/NFC/nfcdead.json"));
      Toast.show("User needs to be in office", {
        type: "danger",
        placement: "top",
        duration: 4000,
        animationType: "zoom-in",
      });
      return;
    }

    try {
      setLottieUri(require("../../assets/Lotties/NFC/nfcLoading.json"));
      setNfcData(null);
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      if (tag && tag.ndefMessage && tag.ndefMessage.length > 0) {
        const ndefMessage = tag.ndefMessage[0];
        const payload = ndefMessage.payload;
        const payloadString = String.fromCharCode.apply(null, payload);
        setNfcData(payloadString);
        setLottieUri(require("../../assets/Lotties/NFC/nfcDone.json"));
        setButtonColor("green"); // Success -> green button
        setButtonDisabled(true); // Disable after successful read
      }
    } catch (ex) {
      console.warn(ex);
      setLottieUri(require("../../assets/Lotties/NFC/nfcdead.json"));
      setButtonColor("red"); // Failure -> red button
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  const handleDisabledPress = () => {
    if (!nfcSupported) {
      Toast.show("NFC hardware not available", {
        type: "warning",
        placement: "bottom",
        duration: 4000,
        animationType: "slide-in",
      });
    } else if (!hasPermission) {
      Toast.show("NFC Permissions required!", {
        type: "warning",
        placement: "bottom",
        duration: 4000,
        animationType: "slide-in",
      });
    } else if (inOffice === false) {
      Toast.show("User not in office", {
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: buttonColor,
              opacity: buttonDisabled ? 0.6 : 1, // Dim button when disabled
            },
          ]}
          onPress={buttonDisabled ? handleDisabledPress : readNfcTag}
        >
          <Text style={styles.buttonText}>Scan NFC tag</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {nfcData ? (
          <View style={styles.dataContainer}>
            <Text style={styles.dataTitle}>NFC Data:</Text>
            <Text style={styles.dataText}>{nfcData}</Text>
          </View>
        ) : (
          <Text style={styles.noDataText}>No NFC data read yet</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flex: 1,
    width: "100%",
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
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dataTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  dataText: {
    fontSize: 16,
    color: "#333",
  },
  noDataText: {
    fontSize: 16,
    color: "#888",
  },
});

export default NFCreader;
