import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  blue,
  foreground,
  marginHorizontal,
  marginVertical,
  textBlue,
} from "../utils/Constants";
import { useNavigation } from "@react-navigation/native";
import MasterCard from "../../assets/svgs/MasterCard";
import COD from "../../assets/svgs/COD";
import { useSelector } from "react-redux";

const PaymentSection = () => {
  const navigation = useNavigation();
  const [cardNumber, setCardNumber] = useState("");
  const payment = useSelector((state) => state.checkout.payment);

  return (
    <View style={styles.container}>
      <View style={styles.line1}>
        <Text style={styles.name}>Payment</Text>
        <Text
          style={styles.change}
          onPress={() => {
            navigation.navigate("PaymentMethods");
          }}
        >
          Change
        </Text>
      </View>
      <View style={styles.line2}>
        <View style={styles.paymentIcon}>
          {payment == "cod" ? <COD /> : <MasterCard />}
        </View>
        {payment == "cod" ? (
          <Text style={styles.paymentText}> Cash on Delivery</Text>
        ) : (
          <Text style={styles.paymentText}>
            **** **** **** {payment.substring(-1, 4)}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    backgroundColor: "#000000",
    height: 42,
    width: 70,
    marginRight: 20,
    borderRadius: 30,
  },
  container: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  line1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  line2: {
    flexDirection: "row",
    marginTop: 15,
  },
  paymentText: {
    fontSize: 16,
    marginLeft: 20,
    alignSelf: "center",
  },
  paymentIcon: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: foreground,
    elevation: 5,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  change: {
    color: textBlue,
    marginRight: 15,
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default PaymentSection;
