import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ShippingAddressCard from "../components/ShippingAddressCard";
import Header from "../components/Header";
import PaymentSection from "../components/PaymentSection";
import DeliveryCard from "../components/DeliveryCard";
import OrderSummary from "../components/OrderSummary";
import LargeBlackButton from "../components/LargeBlackButton";
import { background } from "../utils/Constants";

const Checkout = () => {
  return (
    <View style={styles.container}>
      <Header content="Checkout" back={true} />
      <View style={styles.content}>
        <View>
          <Text style={styles.address}>Shipping Address</Text>
          <ShippingAddressCard />
        </View>
        <PaymentSection />
        <DeliveryCard />
        <OrderSummary />

        <LargeBlackButton btnText="Submit Order" changeTo="ContinueShopping" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background,
    justifyContent: "flex-start",
  },
  content: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  address: {
    marginHorizontal: 15,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Checkout;
