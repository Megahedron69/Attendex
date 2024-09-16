import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Toast } from "react-native-toast-notifications";

const API_URL = `${process.env.EXPO_PUBLIC_BASE_URL}/auth`;

const validateMyEmail = (email: string) => {
  return /^[\w+.-]+@[\da-z-]+\.[\d.a-z-]+$/i.test(email);
};

// Password validation function
const validateMyPass = (pas: string) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i.test(
    pas
  );
};

// Sign-in function
export const mySignInFunc = async (
  email: string,
  pass: string,
  tok: string | null,
  navigation
): Promise<boolean> => {
  if (!validateMyEmail(email) || !validateMyPass(pass)) {
    Toast.show("Invalid email or password", {
      type: "danger",
      placement: "bottom",
      duration: 4000,
      animationType: "zoom-in",
    });
    return false;
  }
  try {
    console.log(API_URL);
    const response = await axios.post(
      `${API_URL}/signIn`,
      {
        mail: email,
        pass: pass,
        tok: tok,
      },
      {
        headers: {
          "client-type": "react-native", // Custom header to identify client type
        },
      }
    );

    const { access_token, refresh_token } = response.data;

    await SecureStore.setItemAsync("access_token", access_token);
    await SecureStore.setItemAsync("refresh_token", refresh_token);
    navigation.navigate("Home");
    Toast.show("Sign-in successful.", {
      type: "success",
      placement: "bottom",
      duration: 4000,
      animationType: "slide-in",
    });
    return true;
  } catch (error) {
    console.log(error);
    Toast.show(`Sign-in error: ${error.response?.data || error.message}`, {
      type: "danger",
      placement: "bottom",
      duration: 4000,
      animationType: "slide-in",
    });
    return false;
  }
};

// Check authentication status
export const checkAuthStatus = async (): Promise<boolean> => {
  try {
    const accessToken = await SecureStore.getItemAsync("access_token");

    if (!accessToken) {
      console.log("No access token found.");
      return false;
    }

    const response = await axios.get(`${API_URL}/authStatus`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "client-type": "react-native",
      },
    });
    const { loginStatus } = response.data;
    return loginStatus;
  } catch (error) {
    Toast.show(
      `Failed to check Authentication status: ${
        error.response?.data || error.message
      }`,
      {
        type: "danger",
        placement: "bottom",
        duration: 4000,
        animationType: "slide-in",
      }
    );
    return false;
  }
};

// Sign-out function
export const signOut = async (navigation): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_URL}/signOut`, {
      headers: {
        "client-type": "react-native",
      },
    });

    if (response.status === 200) {
      await SecureStore.deleteItemAsync("access_token");
      await SecureStore.deleteItemAsync("refresh_token");

      Toast.show("Sign-out successful", {
        type: "success",
        placement: "bottom",
        duration: 4000,
        animationType: "zoom-in",
      });
      navigation.navigate("SignIn");
      return true;
    } else {
      Toast.show(`Sign-out failed with status:${response.status}`, {
        type: "danger",
        placement: "bottom",
        duration: 4000,
        animationType: "zoom-in",
      });
      return false;
    }
  } catch (error) {
    Toast.show(`Error signing out:${error.response?.data || error.message}`, {
      type: "danger",
      placement: "bottom",
      duration: 4000,
      animationType: "zoom-in",
    });
    return false;
  }
};
