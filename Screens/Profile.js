import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import { Checkbox } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const Profile = ({ setIsOnboardingDone }) => {
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    lastName: "",
    phoneNumber: "",
    image: null,
    option1: false,
    option2: false,
    option3: false,
    option4: false,
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user !== null) {
        setForm(JSON.parse(user));
      }
    } catch (e) {
      Alert.alert("Error loading name");
    }
  };

  const handleSubmit = async () => {
    if (!form.firstName || !form.email || !form.lastName || !form.phoneNumber) {
      Alert.alert("Fill the input fields");
      return;
    }
    try {
      await AsyncStorage.setItem("user", JSON.stringify(form));
      Alert.alert("Successful");
    } catch (e) {
      Alert.alert("Error");
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      Alert.alert("Successful Logout");
      setIsOnboardingDone(false);
    } catch (e) {
      Alert.alert("Error");
    }
  };
  const handleDiscard = () => {
    setForm({
      firstName: "",
      email: "",
      lastName: "",
      phoneNumber: "",
      image: null,
    });
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission required");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setForm((prev) => ({
        ...prev,
        image: result.assets[0].uri,
      }));
    }
  };
  const removeImage = async () => {
    try {
      setForm((prev) => ({
        ...prev,
        image: null,
      }));
      const updatedForm = { ...form, image: null };
      await AsyncStorage.setItem("user", JSON.stringify(updatedForm));
    } catch (e) {
      Alert.alert("Error");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Personal Information</Text>
      <View style={styles.imageContainer}>
        {form.image ? (
          <Image source={{ uri: form.image }} style={styles.image} />
        ) : (
          <View
            style={[
              styles.image,
              {
                justifyContent: "center",
                backgroundColor: "#62D6C4",
              },
            ]}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "400",
                color: "white",
                textAlign: "center",
              }}
            >
              {form.firstName ? form.firstName.slice(0, 2) : "GU"}
            </Text>
          </View>
        )}

        <Pressable style={styles.button2} onPress={pickImage}>
          <Text style={[styles.btnText, { color: "white" }]}>Change</Text>
        </Pressable>
        <Pressable style={styles.button3} onPress={removeImage}>
          <Text style={[styles.btnText, { color: "#485D56" }]}>Remove</Text>
        </Pressable>
      </View>
      <View style={styles.form}>
        <View>
          <Text style={styles.inputLabel}>First Name</Text>
          <TextInput
            value={form.firstName}
            onChangeText={(firstName) => setForm({ ...form, firstName })}
            placeholder="John"
            style={styles.input}
          ></TextInput>
        </View>
        <View>
          <Text style={styles.inputLabel}>Last Name</Text>
          <TextInput
            value={form.lastName}
            onChangeText={(lastName) => setForm({ ...form, lastName })}
            placeholder="Doe"
            style={styles.input}
          ></TextInput>
        </View>
        <View>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            value={form.email}
            onChangeText={(email) => setForm({ ...form, email })}
            placeholder="johndoe72@gmail.com"
            style={styles.input}
          ></TextInput>
        </View>
        <View>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput
            value={form.phoneNumber}
            onChangeText={(phoneNumber) => setForm({ ...form, phoneNumber })}
            placeholder="+92 322 2222222"
            style={styles.input}
          ></TextInput>
        </View>
      </View>
      <View style={styles.checkboxContainer}>
        <Text style={styles.subHeading}>Email Notifications</Text>
        <View style={styles.checkbox}>
          <Checkbox
            status={form.option1 ? "checked" : "unchecked"}
            color="#485D56"
            onPress={() => {
              const value = form.option1;
              setForm({ ...form, option1: !value });
            }}
          />
          <Text>Order Statuses</Text>
        </View>
        <View style={styles.checkbox}>
          <Checkbox
            status={form.option2 ? "checked" : "unchecked"}
            color="#485D56"
            onPress={() => {
              const value = form.option2;
              setForm({ ...form, option2: !value });
            }}
          />
          <Text>Password Changes</Text>
        </View>
        <View style={styles.checkbox}>
          <Checkbox
            status={form.option3 ? "checked" : "unchecked"}
            color="#485D56"
            onPress={() => {
              const value = form.option3;
              setForm({ ...form, option3: !value });
            }}
          />
          <Text>Special Offers</Text>
        </View>
        <View style={styles.checkbox}>
          <Checkbox
            status={form.option4 ? "checked" : "unchecked"}
            color="#485D56"
            onPress={() => {
              const value = form.option4;
              setForm({ ...form, option4: !value });
            }}
          />
          <Text>Newsletters</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Pressable onPress={handleLogout} style={[styles.button1]}>
          <Text style={styles.btnText}>Log out</Text>
        </Pressable>
        <View style={styles.footerBox}>
          <Pressable onPress={handleDiscard} style={[styles.button3]}>
            <Text style={[styles.btnText, { color: "#485D56" }]}>
              Discard Changes
            </Text>
          </Pressable>
          <Pressable onPress={handleSubmit} style={[styles.button2]}>
            <Text style={[styles.btnText, { color: "white" }]}>
              Save Changes
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  heading: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 20,
    paddingLeft: 20,
  },
  image: { width: 70, height: 70, borderRadius: 50 },
  form: {
    marginTop: 8,
    alignSelf: "center",
    gap: 10,
    width: "100%",
    paddingHorizontal: 20,
  },
  inputLabel: {
    color: "#455968",
    fontSize: 12,
    fontWeight: "500",
    margin: 3,
  },
  input: {
    borderRadius: 8,
    borderWidth: 0.5,

    paddingLeft: 15,
  },
  checkboxContainer: {
    paddingTop: 10,
  },
  subHeading: {
    fontSize: 16,
    marginLeft: "5%",
    fontWeight: 500,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingLeft: "5%",
  },
  footer: {
    paddingTop: 20,
    gap: 25,
  },
  footerBox: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  button1: {
    width: "90%",
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#F4CE14",
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#f4a214ff",
  },
  button2: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "#485D56",
    alignSelf: "center",
  },
  button3: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#485D56",
    alignSelf: "center",
  },
  btnText: {
    fontWeight: 500,
    fontSize: 15,
    textAlign: "center",
  },
});

export default Profile;
