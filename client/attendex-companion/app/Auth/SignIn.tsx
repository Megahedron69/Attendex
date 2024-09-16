import { type FC, useState } from "react";
import { View, SafeAreaView } from "react-native";
import LoginScreen from "react-native-login-screen";
import Turnstile from "./Turnstile";
import { mySignInFunc } from "../../Utils/Auth";

const logo = require("../../assets/logo.png");

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
      }}
    >
      <LoginScreen
        logoImageSource={logo}
        onLoginPress={handleLoginPress}
        logoImageStyle={{ marginTop: 80 }}
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
        textInputContainerStyle={{
          padding: 32,
        }}
        loginTextStyle={{
          fontSize: 20,
          padding: 2,
          fontWeight: 700,
          textAlign: "center",
          color: "#ffffff",
        }}
        loginButtonStyle={{
          padding: 8,
          borderRadius: 12,
          paddingBottom: 6,
          paddingTop: 6,
          height: 50,
        }}
      />

      <View style={{ opacity: 0, height: 0, pointerEvents: "none" }}>
        <Turnstile onTokenReceived={handleTokenReceived} />
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
