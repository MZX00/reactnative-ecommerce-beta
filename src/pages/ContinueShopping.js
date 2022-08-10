import { View, StyleSheet, Text } from "react-native";
import LargeBlackButton from "../components/LargeBlackButton";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart";
import OrderCompletionSVG from "../../assets/svgs/OrderCompletionSVG";

const ContinueShopping = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCart());
  }, []);

  return (
    <View style={styles.container}>
      <OrderCompletionSVG />
      <Text style={styles.heading}>Success!</Text>
      <Text style={styles.txt}>You order will be delivered soon.</Text>
      <Text style={styles.txt}>Thank you for choosing our app!</Text>
      <LargeBlackButton btnText="CONTINUE SHOPPING" changeTo="HomePage" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
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
