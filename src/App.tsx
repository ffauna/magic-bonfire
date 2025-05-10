import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import { useShaking } from "@hooks/useShaking";
import { useState } from "react";
import { getDarkSoulsMessage } from "./utils/darkSoulsMessageGenerator";

export default function App() {
  const [message, setMessage] = useState("Agita para generar un mensaje");
  const { isShaking } = useShaking(() => {
    setMessage(getDarkSoulsMessage());
  });

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <Image
          source={require("@assets/background-bonfire.jpg")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          alt="Background Bonfire"
        />
      </View>
      <Text style={styles.text}>{message}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },
  text: { color: "#fff", fontSize: 24, fontWeight: "bold" },
});
