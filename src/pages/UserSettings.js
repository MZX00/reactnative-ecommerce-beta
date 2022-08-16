import { View, StyleSheet, Text, Pressable } from "react-native";
import Header from "../components/Header";
import Forward from "../../assets/svgs/Forward";
import Pencil from "../../assets/svgs/Pencil";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const MyOrders = () => {
  const navigation = useNavigation();

  const [nameClicked, setNameClicked] = useState(false);
  const [dobClicked, setDobClicked] = useState(false);

  return (
    <View style={styles.container}>
      <Header content="Settings" back={true} />

      <View style={styles.innerContainer}>
        <Text style={styles.heading3}>Personal Information</Text>

        <View style={styles.dobContainer}>
          <View>
            <Text style={styles.name}>Full name</Text>
            <Text>Matilda Brown</Text>
          </View>
          <Pencil />
        </View>

        <View style={styles.dobContainer}>
          <View>
            <Text>Date of Birth</Text>
            <Text>12/2/1989</Text>
          </View>
        </View>

        <Text style={styles.heading3}>Account</Text>

        <Pressable
          onPress={() => {
            navigation.navigate("ChangePassword");
          }}
          style={styles.dobContainer}
        >
          <Text>Change Password</Text>
          <Forward />
        </Pressable>

        <Pressable
          onPress={() => {
            navigation.navigate("DeleteAccount");
          }}
          style={styles.dobContainer}
        >
          <Text>Delete account</Text>
          <Forward />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#ffffff", flex: 1 },
  innerContainer: {
    padding: 20,
  },
  dobContainer: {
    backgroundColor: "#ffffff",
    elevation: 3,
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heading3: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 5,
  },
  proceed: {
    color: "blue",
  },
  passwordLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
});

export default MyOrders;
