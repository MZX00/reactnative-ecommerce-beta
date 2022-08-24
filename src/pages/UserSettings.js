import { View, StyleSheet, Text, Pressable } from "react-native";
import Header from "../components/Header";
import Forward from "../../assets/svgs/Forward";
import Pencil from "../../assets/svgs/Pencil";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { background, foreground } from "../utils/Constants";
import { TextInput } from "react-native-gesture-handler";
import Tick from "../../assets/svgs/Tick";
import { useSelector } from "react-redux";
import api from "../utils/Api";

const MyOrders = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [dob, setDob] = useState();

  const token = useSelector((state) => state.user.token);

  const loadData = async () => {
    //loading data on page load
    const result = await api("user/view", "post", { token: token });
    if (result && result.body) {
      setName(result.body.name);
      setEmail(result.body.email);
      setDob(result.body.dob.substring(0, 10));
    }
  };

  const setNameApi = async () => {
    const result = await api("user/update/name", "post", {
      token: token,
      name: name,
    });
  };

  useEffect(() => {
    loadData();
  }, []);

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
            <Text style={styles.label}>Full name</Text>
            {nameClicked ? (
              <TextInput
                autoFocus={true}
                value={name}
                onChange={(e) => {
                  setName(e.nativeEvent.text);
                }}
                onBlur={() => {
                  setNameClicked(false);
                }}
              />
            ) : (
              <Text>{name}</Text>
            )}
          </View>
          <Pressable
            onPress={() => {
              if (nameClicked) {
                setNameApi();
              }
              setNameClicked(!nameClicked);
            }}
          >
            {nameClicked ? <Tick /> : <Pencil />}
          </Pressable>
        </View>

        <View style={styles.dobContainer}>
          <View>
            <Text>Date of Birth</Text>
            {dobClicked ? (
              <TextInput
                autoFocus={true}
                value={dob}
                onChange={(e) => {
                  setDob(e.nativeEvent.text);
                }}
                onBlur={() => {
                  setDobClicked(false);
                }}
              />
            ) : (
              <Text>{dob}</Text>
            )}
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
  container: { backgroundColor: background, flex: 1 },
  innerContainer: {
    padding: 20,
  },
  dobContainer: {
    backgroundColor: foreground,
    elevation: 3,
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading3: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 5,
  },
  label: {
    textDecorationLine: "underline",
    paddingBottom: 5,
  },
});

export default MyOrders;
