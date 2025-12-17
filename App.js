import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";

export default function App() {
  const [count, setCount] = useState(0);
  const handleChange = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const handleReset = () => {
    setCount(0);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>This is a counter App</Text>
      <Pressable onPress={handleChange} style={styles.button}>
        <Text style={styles.text}>Counter {count}</Text>
      </Pressable>
      <Pressable
        onPress={handleReset}
        style={[styles.button, { backgroundColor: "rgba(43, 207, 244, 1)" }]}
      >
        <Text style={styles.text}>Reset</Text>
      </Pressable>
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
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
    color: "#222",
  },
  button: {
    backgroundColor: "rgba(239, 205, 13, 1)",
    paddingVertical: 8,
    width: "40%",
    borderRadius: 8,
    margin: 8,
  },
  text: {
    color: "#efe",
    fontSize: 14,
    textAlign: "center",
  },
});
