import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logo from "./../Images/Logo.png";
import HeroImage from "./../Images/Hero image.png";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

export const imageMap = {
  "greekSalad.jpg": require("../Images/greekSalad.jpg"),
  "bruschetta.jpg": require("../Images/bruschetta.jpg"),
  "grilledFish.jpg": require("../Images/grilledFish.jpg"),
  "pasta.jpg": require("../Images/pasta.jpg"),
  "lemonDessert.jpg": require("../Images/lemonDessert.jpg"),
};

const Item = ({ name, price, description, image }) => {
  return (
    <View style={styles.itemB1}>
      <View style={styles.itemB2}>
        <Text style={styles.itemName}>{name}</Text>
        <Text style={styles.itemDescription}>
          {description.length > 60
            ? description.slice(0, 60) + "..."
            : description}
        </Text>
        <Text style={styles.itemPrice}>{`$${price}`}</Text>
      </View>
      <Image style={styles.itemPic} source={imageMap[image]} />
    </View>
  );
};

const HomeScreen = () => {
  const [obj, setObj] = useState({});
  const [data, setData] = useState([]);
  const [activeButtons, setActiveButtons] = useState({
    starters: false,
    mains: false,
    deserts: false,
    drinks: false,
  });
  useEffect(() => {
    loadUser();
    fetch(
      "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data.menu);
      });
  }, []);
  const loadUser = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user !== null) {
        setObj(JSON.parse(user));
      }
    } catch (e) {
      Alert.alert("Error loading name");
    }
  };
  const renderItem = ({ item, index }) => {
    return (
      <Item
        name={item.name}
        price={item.price}
        description={item.description}
        image={item.image}
        index={index + 1}
      />
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Image source={Logo} style={styles.logo} />
        {obj.image ? (
          <Image source={{ uri: obj.image }} style={styles.profile} />
        ) : (
          <View
            style={[
              styles.profile,
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
              {obj.firstName ? obj.firstName.slice(0, 2) : "GU"}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.hero}>
        <Text style={styles.heading}>Little Lemon</Text>
        <View style={styles.b1}>
          <View style={styles.b2}>
            <Text style={styles.subHeading}>Chicago</Text>
            <Text style={styles.text}>
              We are a family owned Mediterranean restaurant, focused on
              traditional recipes served with a modern twist.
            </Text>
          </View>
          <Image style={styles.HeroImage} source={HeroImage} />
        </View>
        <View style={styles.icon}>
          <Pressable onPress={() => console.log("Search pressed")}>
            <Ionicons name="search" size={30} color="#333333" />
          </Pressable>
        </View>
      </View>

      <View style={styles.order}>
        <Text style={styles.title}>Order For Delivery!</Text>
        <View style={styles.btnList}>
          <Pressable
            style={activeButtons.starters ? styles.btn2 : styles.btn1}
            onPress={() => {
              setActiveButtons({
                ...activeButtons,
                starters: !activeButtons.starters,
              });
            }}
          >
            <Text
              style={activeButtons.starters ? styles.btnText2 : styles.btnText1}
            >
              Starters
            </Text>
          </Pressable>
          <Pressable
            style={activeButtons.mains ? styles.btn2 : styles.btn1}
            onPress={() => {
              setActiveButtons({
                ...activeButtons,
                mains: !activeButtons.mains,
              });
            }}
          >
            <Text
              style={activeButtons.mains ? styles.btnText2 : styles.btnText1}
            >
              Mains
            </Text>
          </Pressable>
          <Pressable
            style={activeButtons.deserts ? styles.btn2 : styles.btn1}
            onPress={() => {
              setActiveButtons({
                ...activeButtons,
                deserts: !activeButtons.deserts,
              });
            }}
          >
            <Text
              style={activeButtons.deserts ? styles.btnText2 : styles.btnText1}
            >
              Deserts
            </Text>
          </Pressable>
          <Pressable
            style={activeButtons.drinks ? styles.btn2 : styles.btn1}
            onPress={() => {
              setActiveButtons({
                ...activeButtons,
                drinks: !activeButtons.drinks,
              });
            }}
          >
            <Text
              style={activeButtons.drinks ? styles.btnText2 : styles.btnText1}
            >
              Drinks
            </Text>
          </Pressable>
        </View>
      </View>
      <FlatList
        data={data}
        style={styles.itemList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListFooterComponent={<View style={{ paddingBottom: 20 }}></View>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  nav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 10,
    gap: "10%",
  },
  profile: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  hero: {
    backgroundColor: "#495E57",
    paddingHorizontal: 20,
    paddingBottom: 15,
    paddingTop: 5,
  },
  b1: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 30,
  },
  b2: {
    width: "50%",
    gap: 12,
  },
  heading: {
    color: "#F4CE14",
    fontSize: 32,
    fontWeight: "bold",
  },
  subHeading: {
    color: "#EDEFEE",
    fontSize: 20,
  },
  text: {
    color: "#EDEFEE",
    fontSize: 14,
  },
  HeroImage: {
    height: 110,
    width: 110,
    borderRadius: 12,
  },
  icon: {
    backgroundColor: "#EDEDED",
    alignSelf: "flex-start",
    padding: 5,
    borderRadius: 18,
    marginTop: 10,
  },
  order: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
  },
  btnList: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.3,
    borderBottomColor: "#8f8f8fff",
    paddingVertical: 18,
  },
  btn1: {
    backgroundColor: "#EDEFEE",
    padding: 10,
    borderRadius: 8,
  },
  btnText1: {
    color: "#455A53",
    fontWeight: 500,
  },
  btn2: {
    backgroundColor: "#455A53",
    padding: 10,
    borderRadius: 8,
  },
  btnText2: {
    color: "#EDEFEE",
    fontWeight: 500,
  },
  itemList: {
    paddingHorizontal: 20,
    gap: 10,
  },
  itemName: {
    fontWeight: 500,
  },
  itemDescription: {
    color: "#475D56",
  },
  itemPrice: {
    color: "#495E57",
    fontWeight: 500,
  },
  itemB2: {
    width: "65%",
    gap: 8,
  },
  itemB1: {
    borderBottomWidth: 0.2,
    borderBottomColor: "#c2c2c2ff",
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
  },
  itemPic: {
    height: 80,
    width: 80,
    borderRadius: 8,
  },
});

export default HomeScreen;
