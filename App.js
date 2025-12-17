import { useState } from "react";
import {
  View,
  StatusBar,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

const App = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const handleChange = () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in both fields");
      return;
    }
    Alert.alert("Account not found");
  };
  return (
    <View style={styles.safeArea}>
      <StatusBar
        translucent={true}
        barStyle="dark-content" // Options: 'default', 'light-content', 'dark-content'
        backgroundColor="#E3E9F3" // Android only
      />
      <ScrollView style={styles.scrollView}>
        <Image
          style={styles.logo}
          source={require("./assets/icon.png")}
          alt="Logo"
        />
        <Text style={styles.heading}>Sign in to MyApp</Text>
        <Text style={styles.text}>Get access to your portfolio and more</Text>
        <View>
          <Text style={styles.inputLabel}>Email address</Text>
          <TextInput
            style={styles.inputBox}
            value={form.email}
            keyboardType="email-address"
            placeholder="john@example.com"
            onChangeText={(email) => setForm({ ...form, email })}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.inputBox}
            value={form.password}
            autoCapitalize="none"
            placeholder="*******"
            onChangeText={(password) => setForm({ ...form, password })}
          />
        </View>
        <TouchableOpacity onPress={handleChange} activeOpacity={0.7}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Sign in</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 250 }} onPress={() => {}}>
          <Text style={styles.bottom}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#E3E9F3",
    paddingTop: 40,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#E3E9F3",
  },
  logo: {
    height: 80,
    width: 80,
    resizeMode: "cover",
    alignSelf: "center",
    marginTop: 100,
    borderRadius: 20,
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 700,
    alignSelf: "center",
    marginBottom: 4,
  },
  text: {
    fontSize: 10,
    alignSelf: "center",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 15,
    marginLeft: 20,
    fontWeight: 500,
  },
  inputBox: {
    backgroundColor: "#ffffff",
    width: "90%",
    paddingVertical: 8,
    alignSelf: "center",
    borderRadius: 8,
    paddingLeft: 10,
    margin: 4,
    fontWeight: 400,
    fontSize: 14,
  },
  btn: {
    marginTop: 20,
    backgroundColor: "#0452E8",
    width: "90%",
    paddingVertical: 8,
    alignSelf: "center",
    borderRadius: 8,
  },
  btnText: {
    color: "#ffffff",
    textAlign: "center",
  },
  bottom: {
    textAlign: "center",
    fontWeight: 500,
  },
});

export default App;
