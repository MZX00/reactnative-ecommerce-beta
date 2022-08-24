import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import LargeBlackButton from "../components/LargeBlackButton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cart";
import OrderCompletionSVG from "../../assets/svgs/OrderCompletionSVG";
import OrderFailed from "../../assets/svgs/OrderFailed";
import api from "../utils/Api";
import { background, blue50 } from "../utils/Constants";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React from "react";

const ContinueShopping = () => {
  //redux
  const dispatch = useDispatch();
  const products = useSelector((state) =>
    state.cart.items.map((e) => {
      return { _id: e._id, quantity: e.quantity, size: e.size, color: e.color };
    })
  );
  const token = useSelector((state) => state.user.token);
  const cost = useSelector((state) => {
    return state.cart.items.reduce((sum, { price, quantity }) => {
      return sum + price * quantity;
    }, 0);
  });

  //states
  const [success, setSuccess] = useState(null);
  const [loading, SetLoading] = useState(true);

  //fetching data
  const addToCart = async () => {
    SetLoading(true);
    const result = await api("order/create", "post", {
      products: products,
      token: token,
      cost: cost,
    });
    if (!result.error) {
      dispatch(clearCart());
      setSuccess(true);
    } else {
      setSuccess(false);
    }
    SetLoading(false);
  };

  useEffect(() => {
    addToCart();
  }, []);

  return (
    <SafeAreaView style={[styles.container, loading && styles.loader]}>
      {!loading && (
        <View style={styles.completed}>
          <View>{success ? <OrderCompletionSVG /> : <OrderFailed />}</View>

          <Text style={styles.heading}>{success ? "Success!" : "Failed!"}</Text>

          <Text style={styles.txt}>
            {success
              ? "You order will be delivered soon."
              : "Please try again. Unable to place order."}
          </Text>

          {success && !loading && (
            <Text style={styles.txt}>Thank you for choosing our app!</Text>
          )}
          <View style={styles.button}>
            <LargeBlackButton
              btnText={success ? "CONTINUE SHOPPING" : "Go Back"}
              changeTo={success ? "HomePage" : "goBack"}
            />
          </View>
        </View>
      )}
      {loading && (
        <ActivityIndicator size="large" style={styles.loader} color={blue50} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background,
  },
  completed: {
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",

    flex: 1,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 10,
  },
  txt: {
    fontSize: 16,
  },
  button: {
    width: "100%",
  },
  loader: { justifyContent: "center", alignItems: "center" },
});

export default ContinueShopping;
