import React from "react";
import { StyleSheet, Text, View } from "react-native";
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
    fontSize: 16,
  },
});

export default OrderSummary;
