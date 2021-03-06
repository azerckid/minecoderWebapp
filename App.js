import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
import * as SplashScreen from "expo-splash-screen";
import * as LocalAuthentication from "expo-local-authentication";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function delay_splash() {
  await SplashScreen.preventAutoHideAsync();
  await sleep(2000);
  await SplashScreen.hideAsync();
}

export default function App() {
  const [visible, setVisible] = React.useState(false);
  delay_splash();
  // WebView.getSettings().setCacheMode(LOAD_NO_CACHE);
  const ActivityIndicatorElement = () => {
    return (
      <View style={styles.ActivityIndicatorStyle}>
        <ActivityIndicator color="gray" size="large"></ActivityIndicator>
      </View>
    );
  };

  const onFaceId = async () => {
    try {
      // Checking if device is compatible
      const isCompatible = await LocalAuthentication.hasHardwareAsync();

      if (!isCompatible) {
        throw new Error("Your device isn't compatible.");
      }

      // Checking if device has biometrics records
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!isEnrolled) {
        throw new Error("No Faces / Fingers found.");
      }

      // Authenticate user
      await LocalAuthentication.authenticateAsync();

      Alert.alert("Authenticated", "Welcome back !");
    } catch (error) {
      Alert.alert("An error as occured", error?.message);
    }
  };
  
  React.useEffect(() => {
    onFaceId();
  });

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{
          uri: "https://app.minecoder.net/",
          method: "GET",
          headers: { "Cache-Control": "no-cache" },
        }}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onLoadStart={() => setVisible(true)}
        onLoad={() => setVisible(false)}
      />
      {visible ? <ActivityIndicatorElement /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: "#000",
  },
  ActivityIndicatorStyle: {
    flex: 1,
    position: "absolute",
    marginLeft: "auto",
    marginTop: "auto",
    marginRight: "auto",
    marginBottom: "auto",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
  },
});
