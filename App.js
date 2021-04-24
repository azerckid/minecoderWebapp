import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
  const [visible, setVisible] = React.useState(false);
  const ActivityIndicatorElement = () => {
    return(
      <View style={styles.ActivityIndicatorStyle}>
        <ActivityIndicator color="gray" size="large"></ActivityIndicator>
      </View>
    )
  };
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: "http://mlm.banco.id/" }}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onLoadStart={()=> setVisible(true)}
        onLoad={()=> setVisible(false)}
      />
      {visible? <ActivityIndicatorElement /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor:"#000"
  },
  ActivityIndicatorStyle:{
    flex: 1,
    position: "absolute",
    marginLeft:"auto",
    marginTop:"auto",
    marginRight:"auto",
    marginBottom:"auto",
    left:0,
    top:0,
    right:0,
    bottom:0,
    justifyContent:"center"
  }
});
