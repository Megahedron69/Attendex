import { type FC, useState } from "react";
import { View, SafeAreaView } from "react-native";
import LoginScreen from "react-native-login-screen";
import Turnstile from "./Turnstile";
import { mySignInFunc } from "../Utils/Auth";

const logo = require("../assets/logo.png");

const SignIn: FC = ({ navigation }) => {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPass, setSignInPass] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleTokenReceived = (token: string) => {
    setTurnstileToken(token);
  };

  const handleLoginPress = async () => {
    const success = await mySignInFunc(
      signInEmail,
      signInPass,
      turnstileToken,
      navigation
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        marginTop: 80,
      }}
    >
      <LoginScreen
        logoImageSource={logo}
        onLoginPress={handleLoginPress}
        onSignupPress={() => {
          console.log("no signup");
        }}
        onEmailChange={setSignInEmail}
        onPasswordChange={setSignInPass}
        enablePasswordValidation
        disableSignup
        disableDivider
        disableSocialButtons
        disablePasswordTooltip
      />
      <View style={{ opacity: 0, height: 0, pointerEvents: "none" }}>
        <Turnstile onTokenReceived={handleTokenReceived} />
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
