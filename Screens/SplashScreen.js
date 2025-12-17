import { View, Text, StyleSheet, Image } from "react-native";
import Logo from "../Images/Logo.png";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CBD2D9",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    resizeMode: "contain",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#455968",
  },
});
