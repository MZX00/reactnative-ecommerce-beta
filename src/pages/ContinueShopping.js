import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import LargeBlackButton from "../components/LargeBlackButton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart } from "../features/cart";
import OrderCompletionSVG from "../../assets/svgs/OrderCompletionSVG";
import OrderFailed from "../../assets/svgs/OrderFailed";
import api from "../utils/Api";
import { background } from "../utils/Constants";

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

  const addToCart = async () => {
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
  };

  useEffect(() => {
    addToCart();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {success ? <OrderCompletionSVG /> : <OrderFailed />}
      <Text style={styles.heading}>{success ? "Success!" : "Failed!"}</Text>
      <Text style={styles.txt}>
        {success
          ? "You order will be delivered soon."
          : "Please try again. Unable to place order."}
      </Text>
      {success && (
        <Text style={styles.txt}>Thank you for choosing our app!</Text>
      )}
      <LargeBlackButton
        btnText={success ? "CONTINUE SHOPPING" : "Go Back"}
        changeTo={success ? "HomePage" : "goBack"}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: background,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 24,
  },
  txt: {
    fontSize: 16,
  },
});

export default ContinueShopping;
