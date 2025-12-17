import { View, StyleSheet, Text } from "react-native";

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text>This is Profile Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Profile;
