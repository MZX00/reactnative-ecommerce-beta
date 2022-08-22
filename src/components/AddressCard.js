import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  foreground,
  marginHorizontal,
  marginVertical,
} from "../utils/Constants";
import { useNavigation } from "@react-navigation/native";
import CheckBox from "./CheckBox";
import { useDispatch, useSelector } from "react-redux";
import { setAddress } from "../features/checkout";

const ShippingAddressCard = ({
  _id,
  fullName,
  address,
  city,
  state,
  country,
}) => {
  const dispatch = useDispatch();
  const selected = useSelector((state) => {
    if (state.checkout.address._id === _id) {
      return true;
    } else {
      return false;
    }
  });
  const navigation = useNavigation();

  const onPress = () => {
    dispatch(setAddress({ _id, fullName, address, city, state, country }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.line1}>
        <Text style={styles.name}>{fullName}</Text>
        <Text
          style={styles.change}
          onPress={() => {
            navigation.navigate("AddAddress");
          }}
        >
          Edit
        </Text>
      </View>
      <View>
        <Text style={styles.address}>{address}</Text>
        <Text style={styles.address}>{city + " " + state}</Text>
        <Text style={styles.address}>{country}</Text>
      </View>
      <CheckBox
        label="select shipping address"
        selected={selected}
        onPress={onPress}
      />
      <View style={styles.checkbox}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 8,
    backgroundColor: foreground,
    elevation: 10,
    borderRadius: 15,
  },
  line1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkbox: {
    marginLeft: -20,
  },
  name: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  change: {
    color: "blue",
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  address: { marginBottom: 5 },
});

export default ShippingAddressCard;
