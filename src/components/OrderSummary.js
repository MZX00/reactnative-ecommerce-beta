import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { marginHorizontal, marginVertical } from "../utils/Constants";
import LargeBlackButton from "../components/LargeBlackButton";
import { useSelector } from "react-redux";

const OrderSummary = () => {
  const total = useSelector((state) => {
    return state.cart.items.reduce((sum, { price, quantity }) => {
      return sum + price * quantity;
    }, 0);
  });
  return (
    <View style={styles.container}>
      <View style={styles.line1}>
        <Text>Order:</Text>
        <Text>USD $ {total}</Text>
      </View>
      <View style={styles.line1}>
        <Text>Delivery:</Text>
        <Text>USD $ 15</Text>
      </View>
      <View style={styles.line}></View>
      <View style={styles.line1}>
        <Text style={styles.summary}>Summary:</Text>
        <Text style={styles.summary}>USD $ {total + 15}</Text>
      </View>
      {/* <LargeBlackButton btnText="Submit Order" changeTo="ContinueShopping" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
  line1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  line: {
    marginVertical: 4,
    height: 0.5,
    backgroundColor: "#000000",
  },
  summary: {
    // fontWeight: "bold",
    fontSize: 16,
  },
});

export default OrderSummary;
