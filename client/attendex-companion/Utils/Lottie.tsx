import type { FC } from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";

interface nfcLottieProps {
  uri: any;
  backgroundColor?: string;
  containerColor?: string;
}
export const NFCLottie: FC<nfcLottieProps> = ({
  uri,
  backgroundColor = "#fff",
  containerColor = "#fff",
}) => {
  return (
    <View
      style={{
        backgroundColor: containerColor,
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
          backgroundColor: backgroundColor,
        }}
      />
    </View>
  );
};
