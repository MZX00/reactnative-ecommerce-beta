import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { init } from "../features/validation";
import { black, marginHorizontal, marginVertical } from "../utils/Constants";
import BackIcon from "../../assets/svgs/BackIcon";

const Header = ({ flex, content, back = false, onPress }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const defaultOnPress = () => {
    dispatch(init(0));
    navigation.goBack();
  };

  return (
    <View
      style={{
        flex: flex,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {back && (
        <TouchableOpacity
          style={styles.backicon}
          onPress={onPress ? onPress : defaultOnPress}
        >
          <BackIcon />
        </TouchableOpacity>
      )}
      <Text style={styles.heading}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  backicon: {
    marginVertical: marginVertical,
    alignSelf: "center",
    justifyContent: "flex-start",
    position: "absolute",
    left: 20,
    padding: 10,
  },
  heading: {
    marginHorizontal: marginHorizontal,
    marginVertical: marginVertical,
    alignSelf: "center",
    color: black,
    fontSize: 32,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});

export default Header;
