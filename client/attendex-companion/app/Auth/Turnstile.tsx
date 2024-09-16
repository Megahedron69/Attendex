import { type FC } from "react";
import { View } from "react-native";
import WebView from "react-native-webview";

interface TurnstileProps {
  onTokenReceived: (token: string) => void;
}

const Turnstile: FC<TurnstileProps> = ({ onTokenReceived }) => {
  const handleMessage = (event: { nativeEvent: { data: any } }) => {
    const token = event.nativeEvent.data;
    onTokenReceived(token);
  };
  const siteKey =
    process.env.EXPO_PUBLIC_PROJECT_STATUS == "DEVELOPMENT"
      ? process.env.EXPO_PUBLIC_CLOUDFARE_TEST_KEY
      : process.env.EXPO_PUBLIC_CLOUDFARE_TURNSTILE_KEY;
  return (
    <View style={{ flex: 1 }}>
      <WebView
        onMessage={handleMessage}
        source={{
          html: `
                <!DOCTYPE html>
                <html>
                  <head>
                   <script src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=_turnstileCb" async defer></script>
                  </head>
                  <body>
                     <div id="myWidget">Widget Loading...</div>
                     <script>
                        function _turnstileCb() {
                            turnstile.render('#myWidget', {
                              sitekey: '${siteKey}',
                              callback: (token) => {
                                window.ReactNativeWebView.postMessage(token);
                              },
                            });
                        }
                     </script>
                  </body>
                </html>
            `,
        }}
      />
    </View>
  );
};

export default Turnstile;
