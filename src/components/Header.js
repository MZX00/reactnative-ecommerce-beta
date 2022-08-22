import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { init } from "../features/validation";
import { StatusBar } from "react-native";
import {
  black,
  foreground,
  marginHorizontal,
  marginVertical,
} from "../utils/Constants";
import BackIcon from "../../assets/svgs/BackIcon";

const Header = ({ content, back = false, onPress, elevate = true }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const defaultOnPress = () => {
    dispatch(init(0));
    navigation.goBack();
  };

  return (
    <View style={[styles.container, elevate && styles.elevate]}>
      {back ? (
        <TouchableOpacity
          style={styles.backicon}
          onPress={onPress ? onPress : defaultOnPress}
        >
          <BackIcon />
        </TouchableOpacity>
      ) : (
        <View style={styles.buffer}></View>
      )}
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit={true}
        style={styles.heading}
      >
        {content}
      </Text>
      <View style={styles.buffer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: foreground,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    paddingTop: StatusBar.currentHeight,
  },
  backicon: {
    flex: 0.15,
    alignItems: "center",
  },
  heading: {
    flex: 0.7,
    paddingVertical: 15,
    color: black,
    fontSize: 32,
    fontWeight: "bold",
    textTransform: "capitalize",
    textAlign: "center",
  },
  buffer: {
    flex: 0.15,
  },
  elevate: {
    elevation: 20,
  },
});

export default Header;
