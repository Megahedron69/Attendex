import type { FC } from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";
export const LoadingLottie = () => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <LottieView
        source={require("../assets/Lotties/loading.json")}
        autoPlay
        loop
        style={{
          width: 400,
          height: 400,
          backgroundColor: "white",
        }}
      />
    </View>
  );
};
interface nfcLottieProps {
  uri: any;
}
export const NFCLottie: FC<nfcLottieProps> = ({ uri }) => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <LottieView
        source={uri}
        autoPlay
        loop
        style={{
          width: 400,
          height: 400,
          backgroundColor: "white",
        }}
      />
    </View>
  );
};
