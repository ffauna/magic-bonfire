import { StatusBar } from "expo-status-bar";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  useAnimatedValue,
  View,
} from "react-native";
import { useShaking } from "@hooks/useShaking";
import { useEffect, useState } from "react";
import { getDarkSoulsMessage } from "./utils/darkSoulsMessageGenerator";
import * as NavigationBar from "expo-navigation-bar";

export default function App() {
  const fadeAnim = useAnimatedValue(1);
  const [message, setMessage] = useState("Agita para generar un mensaje");
  const { isShaking } = useShaking(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setMessage(getDarkSoulsMessage());
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    });
  });

  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
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
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.text}>{message}</Text>
      </Animated.View>
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
