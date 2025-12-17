import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Alert,
  Platform,
  ScrollView,
} from "react-native";
import Logo from "../Images/Logo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OnBoardingScreen = ({ setIsOnboardingDone }) => {
  const [form, setForm] = useState({ name: "", email: "" });

  const handleSubmit = async () => {
    if (!form.name || !form.email) {
      Alert.alert("Fill the input fields");
      return;
    }
    setForm({ name: "", email: "" });
    try {
      await AsyncStorage.setItem("onboardingCompleted", "true");
      setIsOnboardingDone(true);
    } catch (e) {
      Alert.alert("Something went wrong.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.nav}>
          <Image source={Logo} style={styles.logo} />
        </View>
        <View style={styles.body}>
          <Text style={styles.heading}>Let us get to know you</Text>
          <View style={styles.form}>
            <Text style={styles.inputLabel}>First Name</Text>
            <TextInput
              style={styles.input}
              value={form.name}
              placeholder="John Doe"
              onChangeText={(name) => setForm({ ...form, name })}
            ></TextInput>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={form.email}
              onChangeText={(email) => setForm({ ...form, email })}
              placeholder="johndoe@gmail.com"
              keyboardType="email-address"
            ></TextInput>
          </View>
        </View>
        <View style={styles.footer}>
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.inputLabel}>Next</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#CBD2D9",
    flex: 1,
  },
  nav: {
    paddingVertical: 15,
    backgroundColor: "#DEE3E9",
    justifyContent: "center",
  },
  logo: {
    resizeMode: "contain",
    alignSelf: "center",
  },
  body: {
    flex: 2,
    justifyContent: "space-around",
    paddingVertical: 20,
  },
  heading: {
    color: "#455968",
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
  },
  form: {
    width: "100%",
    alignSelf: "center",
    gap: 10,
  },
  inputLabel: {
    color: "#455968",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
  input: {
    width: "80%",
    borderColor: "#455968",
    borderRadius: 8,
    borderWidth: 2,
    alignSelf: "center",
    paddingLeft: 15,
  },
  footer: {
    flex: 1,
    backgroundColor: "#F1F4F7",
    justifyContent: "center",
  },
  button: {
    paddingVertical: 10,
    marginRight: "10%",
    paddingHorizontal: 30,
    borderRadius: 8,
    backgroundColor: "#CBD2D9",
    alignSelf: "flex-end",
  },
});

export default OnBoardingScreen;
