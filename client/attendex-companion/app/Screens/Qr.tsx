import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { CameraView, Camera } from "expo-camera";
import { NFCLottie } from "../../Utils/Lottie";

import { Toast } from "react-native-toast-notifications";
import { type RouteProps } from "../../Utils/Constants";
import { useRoute } from "@react-navigation/native";

// Lottie animations
const scanningLottie = require("../../assets/Lotties/QR/qrscan.json");
const scannedLottie = require("../../assets/Lotties/QR/qr.json");
const loadingCam = require("../../assets/Lotties/QR/qrLoading.json");

const Qr = () => {
  const route = useRoute<RouteProps>();
  const { inOffice, width, height } = route.params;
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(true);

  const [scannedData, setScannedData] = useState<string | null>(null);
  const [lottieUri, setLottieUri] = useState(scanningLottie);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const getCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };
  useEffect(() => {
    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (inOffice === false) {
      Toast.show("User not in office", {
        type: "warning",
        placement: "bottom",
        duration: 4000,
        animationType: "slide-in",
      });
      return;
    }
    setScannedData(data);
    console.log(data);
    setIsScanning(false); // Stop scanning
    setLottieUri(scannedLottie); // Switch to success Lottie
    Toast.show(`Scanned QR Code`, {
      type: "success",
      placement: "center",
      duration: 4000,
      animationType: "slide-in",
      successColor: "#82DD55",
    });
  };

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <NFCLottie uri={loadingCam} />
        <View style={styles.messageContainer}>
          <Text style={styles.message}>
            Camera permission is required to scan QR codes
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              await getCameraPermissions();
              Toast.show("Requesting Camera Permission", {
                type: "warning",
                placement: "center",
                duration: 4000,
                animationType: "zoom-in",
              });
            }}
          >
            <Text style={styles.buttonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {scannedData ? (
        <SafeAreaView style={styles.container}>
          <View style={styles.lottieContainer}>
            <NFCLottie uri={scannedLottie} />
          </View>
          <View style={styles.scrollContainer}>
            <View style={styles.dataContainer}>
              <Text style={[styles.dataTitle]}>Attendance logged</Text>
            </View>
          </View>
        </SafeAreaView>
      ) : (
        <CameraView
          style={{ flex: 1, zIndex: -10, width: width, height: height }}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={scannedData ? undefined : handleBarCodeScanned}
        >
          <View
            style={{
              backgroundColor: "transparent",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              zIndex: 50,
            }}
          >
            <NFCLottie
              uri={scannedLottie}
              backgroundColor="transparent"
              containerColor="transparent"
            />
          </View>
        </CameraView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  camera: {
    flex: 1,
    zIndex: -10,
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  button: {
    backgroundColor: "#42A5F5",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  lottieContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 80,
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
    backgroundColor: "#82DD55",
    elevation: 5,
    shadowColor: "#000",
    shadowRadius: 11,
    shadowOffset: {
      width: 10,
      height: 2,
    },
    borderRadius: 18,
    textAlign: "center",
  },
  dataTitle: {
    color: "#fff",
    fontWeight: 700,
    fontSize: 18,
    marginBottom: 8,
  },
});

export default Qr;
